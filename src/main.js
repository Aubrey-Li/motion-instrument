// Importing the required modules
import { WebSocketServer } from 'ws';
// import Worker from 'web-worker';

// const worker = new Worker('footdrum_web_worker.cjs');
// const worker = new Worker('../src/instrument.cjs');

// Creating a new websocket server
const wss = new WebSocketServer({ port: 8080 });

var webSocketList = [];
var id = 0;
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected, client id:", id);
    webSocketList.push(ws);
    id++;
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        const nums_str = data.toString();
        // console.log(nums_str[0]);
        // sending the x, y coordinate to the worker
        if (webSocketList.length == 2) {
            webSocketList[1].send(nums_str);
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");

// function handleMessage(coord) {
//     postMessage(coord);
// }