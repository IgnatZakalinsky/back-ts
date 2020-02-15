import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import SomeString, {ISomeString} from "./SomeString";

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
const fakeState = {
    counter: 0,
};

////////////////////////////////////////////////////////////////////////////////
const someRouter = express.Router();

someRouter.get('/y', async (req: Request, res: Response) => {
    if (req.query.y !== '1') {
        res.status(266).json({z: 'idi nah!'});
    }

    else {
        fakeState.counter += 1;

        try {
            const someString1: ISomeString = await SomeString.create({str: fakeState.counter});
            const someStrings: ISomeString[] = await SomeString.find();
            const someString: ISomeString | null = await SomeString
                    .findByIdAndUpdate(someStrings[0]._id, {str: fakeState.counter}, {new: true});

            res.status(200)
                .json({z: req.query, count: fakeState.counter, someString, someStrings})

        } catch (e) {
            res.status(200).json({z: req.query, count: fakeState.counter, e})
        }

    }
});

app.use('/x', someRouter);

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
