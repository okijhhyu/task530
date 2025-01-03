const { WebSocketServer } = require('ws');
const fs = require('fs');
const https = require('https');

const server = https.createServer({
    cert: fs.readFileSync('/26786.crt'), // Полный цепочный сертификат
    key: fs.readFileSync('/privat.key'),   // Приватный ключ
  });

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Handle incoming messages from the client
  ws.on('message', (data) => {
    const message = data.toString();
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ message }));
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(443, () => {
    console.log('Secure WebSocket server is running on wss://localhost');
  });