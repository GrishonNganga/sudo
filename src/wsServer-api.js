const WebSocketServer = require('ws').Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({port: WEBSOCKET_PORT});

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  wsServer.on('connection', ws=>{
    console.log("new Client connected")

    ws.on('message', data=>{
      console.log("Data", data)
      data = JSON.parse(data)
      stepService.add(data.username, data.ts, data.newSteps)
    })

    ws.on('close', ()=>{
      console.log("Client disconnected")
    })
  })
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.

  return wsServer;
};
