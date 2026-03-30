"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = require("yaml");
const ws_1 = __importDefault(require("ws"));
const port = 8001; // порт на котором будет развернут этот (вебсокет) сервер
const hostname = 'localhost'; // адрес вебсокет сервера
const transportLevelPort = 8002; // порт сервера транспортного уровня
const transportLevelHostname = '192.168.12.172'; // адрес сервера транспортного уровня
const app = (0, express_1.default)(); // создание экземпляра приложения express
const server = http_1.default.createServer(app); // создание HTTP-сервера
// Используйте express.json() для парсинга JSON тела запроса
app.use(express_1.default.json());
const openapiPath = path_1.default.join(__dirname, 'openapi.yaml');
const openapiSpec = (0, yaml_1.parse)(fs_1.default.readFileSync(openapiPath, 'utf8'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpec));
app.get('/openapi.yaml', (_req, res) => {
    res.type('application/yaml').send(fs_1.default.readFileSync(openapiPath, 'utf8'));
});
app.post('/receive', (req, res) => {
    const message = req.body;
    if (!(message === null || message === void 0 ? void 0 : message.username)) {
        res.sendStatus(400);
        return;
    }
    sendMessageToOtherUsers(message.username, message);
    res.sendStatus(200);
});
// запуск сервера приложения
server.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
});
const wss = new ws_1.default.WebSocketServer({ server });
const users = {};
const sendMsgToTransportLevel = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`http://${transportLevelHostname}:${transportLevelPort}/send`, message);
        if (response.status !== 200) {
            message.error = 'Error from transport level by sending message';
            console.error('Transport level returned non-200:', response.status);
        }
        console.log('Response from transport level: ', response.status);
    }
    catch (error) {
        message.error = 'Transport level unavailable';
        console.error('Error sending to transport level:', error);
    }
});
function sendMessageToOtherUsers(username, message) {
    const msgString = JSON.stringify(message);
    for (const key in users) {
        console.log(`[array] key: ${key}, users[keys]: ${JSON.stringify(users[key])} username: ${username}`);
        if (key !== username) {
            users[key].forEach(element => {
                element.ws.send(msgString);
            });
        }
    }
}
wss.on('connection', (websocketConnection, req) => {
    if (!req.url || req.url.length === 0) {
        console.log(`Error: req.url = ${req.url}`);
        return;
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const username = url.searchParams.get('username');
    if (username !== null) {
        console.log(`[open] Connected, username: ${username}`);
        if (username in users) {
            users[username] = [...users[username], { id: users[username].length + 1, ws: websocketConnection }];
        }
        else {
            users[username] = [{ id: 1, ws: websocketConnection }];
        }
    }
    else {
        console.log('[open] Connected');
    }
    console.log('users collection', users);
    websocketConnection.on('message', (messageData) => {
        var _a, _b;
        if (username === null)
            return;
        const messageString = messageData.toString();
        console.log('[message] Received from ' + username + ': ' + messageString);
        const message = JSON.parse(messageString);
        message.username = (_a = message.username) !== null && _a !== void 0 ? _a : username;
        message.send_time = (_b = message.send_time) !== null && _b !== void 0 ? _b : new Date().toISOString();
        // Мгновенно рассылаем в общий чат внутри websocket-сервера.
        // Параллельно отправляем на транспортный уровень.
        sendMessageToOtherUsers(message.username, message);
        void sendMsgToTransportLevel(message);
    });
    websocketConnection.on('close', (event) => {
        var _a;
        console.log(username, '[close] Соединение прервано', event);
        if (username === null)
            return;
        users[username] = ((_a = users[username]) !== null && _a !== void 0 ? _a : []).filter((item) => item.ws !== websocketConnection);
        if (users[username].length === 0) {
            delete users[username];
        }
    });
});
//# sourceMappingURL=index.js.map