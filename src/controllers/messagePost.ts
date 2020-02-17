import {Request, Response} from "express";
import {store} from "../db/fakeStore";

export const messagePost = async (req: Request, res: Response) => {
    const status = store.messagePost(+req.body.chatId, req.body.message, +req.body.userId);

    res.status(200).json({status})
};
