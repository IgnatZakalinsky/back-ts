import {Request, Response} from "express";
import {store} from "../db/fakeStore";

export const messageGet = async (req: Request, res: Response) => {
    const body = store.messageGet(+req.query.chatId, +req.query.date, +req.query.userId);

    res.status(200).json(body)
};