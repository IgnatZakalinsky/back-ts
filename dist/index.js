"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const userPost_1 = require("./controllers/userPost");
const userGet_1 = require("./controllers/userGet");
const app = express_1.default();
//////////////////////////////////////////////////////////////////////
app.use(cors_1.default());
// parse application/json
app.use(body_parser_1.default.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
// log middleware
app.use((req, res, next) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    console.log('cookies:', req.cookies);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});
////////////////////////////////////////////////////////////////////////////////
const userRouter = express_1.default.Router();
userRouter.post('/', userPost_1.userPost);
userRouter.get('/', userGet_1.userGet);
app.use('/user', userRouter);
////////////////////////////////////////////////////////////////////////////////
mongoose_1.default.connect('mongodb+srv://ai73aaa:1qazxcvBG@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('MongoDB connected successfully');
    //start
    app.listen(process.env.PORT, () => {
        console.log('Neko-back listening on port: ' + process.env.PORT);
    });
})
    .catch(e => console.log('MongoDB connection error: ' + e));
///////////////////////////////////////////////////////////
//# sourceMappingURL=index.js.map