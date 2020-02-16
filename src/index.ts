import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import {userPost} from './controllers/userPost';
import {userGet} from "./controllers/userGet";
import {messageGet} from './controllers/messageGet';
import {messagePost} from "./controllers/messagePost";
import {store} from "./db/fakeStore";

const app = express();

//////////////////////////////////////////////////////////////////////
app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
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
const userRouter = express.Router();
userRouter.post('/', userPost);
userRouter.get('/', userGet);
app.use('/user', userRouter);

const messageRouter = express.Router();
messageRouter.get('/', messageGet);
messageRouter.post('/', messagePost);
app.use('/message', messageRouter);

const devRouter = express.Router();
devRouter.get('/', (req: Request, res: Response) => res.status(200).json(store.chats));
app.use('/', messageRouter);

////////////////////////////////////////////////////////////////////////////////
mongoose.connect(
    'mongodb+srv://ai73aaa:1qazxcvBG@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => {
        console.log('MongoDB connected successfully');

        //start
        app.listen(process.env.PORT, () => {
            console.log('Neko-back listening on port: ' + process.env.PORT);
        });
    })
    .catch(e => console.log('MongoDB connection error: ' + e));

///////////////////////////////////////////////////////////
