import {Request, Response} from "express";
import {store} from "../db/fakeStore";

export const userGet = async (req: Request, res: Response) => {
    const body = store.getChat(+req.query.userId);

    res.status(200).json(body)
};