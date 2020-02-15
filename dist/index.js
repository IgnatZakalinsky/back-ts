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
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const SomeString_1 = __importDefault(require("./SomeString"));
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
const fakeState = {
    counter: 0,
};
////////////////////////////////////////////////////////////////////////////////
const someRouter = express_1.default.Router();
someRouter.get('/y', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.y !== '1') {
        res.status(266).json({ z: 'idi nah!' });
    }
    else {
        fakeState.counter += 1;
        try {
            // const someString: ISomeString = await SomeString.create({str: fakeState.counter});
            const someStrings = yield SomeString_1.default.find();
            const someString = yield SomeString_1.default
                .findByIdAndUpdate(someStrings[0]._id, { str: fakeState.counter }, { new: true });
            res.status(200)
                .json({ z: req.query, count: fakeState.counter, someString, someStrings });
        }
        catch (e) {
            res.status(200).json({ z: req.query, count: fakeState.counter, e });
        }
    }
}));
app.use('/x', someRouter);
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