// Importing the required modules
import { WebSocketServer } from 'ws';
import Worker from 'web-worker';

const worker = new Worker('../src/footdrum_web_worker.cjs');
 
// Creating a new websocket server
const wss = new WebSocketServer({ port: 8080 });
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    
    // sending message
    ws.on("message", data => {
        //console.log(`Client has sent us: ${data}`);
        const nums_str = data.toString().split('\t');
        //const nums = nums.map(x => Number(x));
        worker.postMessage(nums_str[0]);
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
