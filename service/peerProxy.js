const { WebSocketServer } = require('ws');


function peerProxy(httpServer) {
  console.log('Starting peer proxy...');
  // Create a websocket object
  const socketServer = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    socketServer.handleUpgrade(request, socket, head, (ws) => {
      socketServer.emit('connection', ws, request);
    });
  });
  let rooms = {};

  socketServer.on('connection', (socket) => {

    console.log('New client connected');
    socket.send(JSON.stringify({ type: 'connection', message: 'Welcome to the WebSocket server!' }));
    socket.isAlive = true;



    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      try {
        const parsedData = JSON.parse(data);
        console.log('Received message from client:', parsedData);
        if (parsedData.type === 'join') {
          // player can join a room that has already been created
          const roomCode = parsedData.roomCode;
          if (!rooms[roomCode]) {
            rooms[roomCode] = { players: [] };
          }
          rooms[roomCode].players.push(socket);
          socket.send(JSON.stringify({ type: 'joined', message: `Joined room ${roomCode}` }));
          if (rooms[roomCode].players.length == 2) {
            rooms[roomCode].players.forEach((player, index) => {
              player.send(JSON.stringify({ type: 'start', playerNumber: index + 1 }));
            });
          }
        } else if (parsedData.type === 'move') {
          const roomCode = parsedData.roomCode;
          if (rooms[roomCode]) {
            rooms[roomCode].players.forEach((player) => {
              if (player !== socket && player.readyState === WebSocket.OPEN) {
                player.send(JSON.stringify(parsedData));
              }
            });
          }
        }
    } catch (error) { 
        console.error('Error parsing message:', error);
        socket.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    //Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
  
    }

module.exports = { peerProxy };
