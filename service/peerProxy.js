const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  console.log('Starting peer proxy...');
  let players = [];
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {

    console.log('New client connected');
    socket.send(JSON.stringify({ type: 'connection', message: 'Welcome to the WebSocket server!' }));
    socket.isAlive = true;

    players.push(socket);

    // if (players.length == 2) {
    //   players.forEach((player, index) => {
    //     player.send(JSON.stringify({ type: 'start', playerNumber: index + 1 }));
    //   });
      
    // }

    // Forward messages to everyone except the sender
    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
  //   socket.on('pong', () => {
  //     socket.isAlive = true;
  //   });
  // });

  // // Periodically send out a ping message to make sure clients are alive
  // setInterval(() => {
  //   socketServer.clients.forEach(function each(client) {
  //     if (client.isAlive === false) return client.terminate();

  //     client.isAlive = false;
  //     client.ping();
  //   });
  }, 10000);
  
    }

module.exports = { peerProxy };
