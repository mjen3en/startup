const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = 'token';
const DB = require('./database.js');
const websocket = require('./peerProxy.js');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use('/api', apiRouter);

//mocked database
//mocked game database
let games = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;



// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

const verifyGameCode = async (req, res, next) => {
  const gameCode = req.body.code;
  if (gameCode.length == 6 || gameCode.match(/^[a-zA-Z0-9]+$/)) {
    next();
  } else {
    res.status(400).send({ msg: 'Invalid game code' });
  }
};

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  });

  // GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        DB.updateUser(user);
        setAuthCookie(res, user.token);
        res.send({ email: user.email, token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth logout a user
  apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
      DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });


  apiRouter.post('/createGame', verifyAuth, verifyGameCode, async (req, res) => {
    const gameCode = req.body.code
    const player = req.body.player;
    if (!gameCode || !player) {
      res.status(400).send({ msg: 'Missing code or player' });
      return;
    }
    const game = await createGame(gameCode, player);
    res.send({ code: game.code, players: game.players });

  });

  apiRouter.put('/sendGame', verifyAuth, async (req, res) => {
    const winner = req.body.winner;
    if (!winner) {
      res.status(400).send({ msg: 'Missing player' });
      return;
    }
    DB.sendGame(winner);
    res.send({ msg: 'Game sent' });
  });

  apiRouter.get('/getWinners', verifyAuth, async (req, res) => {
    const winners = await DB.getWinners();
    console.log('Winners from DB:', winners);
    if (!winners) {
      res.status(404).send({ msg: 'No winners found' });
      return;
    }
    res.send({winners: winners})
  });

  apiRouter.put('/joinGame', verifyAuth, verifyGameCode, async (req, res) => {
    const gameCode = req.body.code;
    const player = req.body.player
    if (!gameCode || !player) {
      res.status(400).send({ msg: 'Missing code or player' });
      return;
    }
    const game = await findGame('code', gameCode);
    if (game) {
      game.players.push(player);
      res.send({ code: game.code, players: game.players });
    } else {
      res.status(404).send({ msg: 'Game not found' });
    }
  });

  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await DB.addUser(user);
  
    return user;
  }
  async function createGame(code, player) {
    const game = {
      code: code,
      players: [player],
    };
    games.push(game);
    return game;
  }

  async function findGame(field, gameCode) {
    if (!gameCode) return null;
  
    return games.find((g) => g[field] === gameCode);
  }

  
  async function findUser(field, value) {
    if (!value) return null;
  
    if (field === 'token') {
      return DB.getUserByToken(value);
    }
    return DB.getUser(value);
  }

  

  
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

  
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

 websocket.peerProxy(httpService);