import {Request, Response} from "express";
import {store} from "../db/fakeStore";

export const messagePost = async (req: Request, res: Response) => {
    const status = store.messagePost(+req.query.chatId, req.query.message, +req.query.userId);

    res.status(200).json({status})
};