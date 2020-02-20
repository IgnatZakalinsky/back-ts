import {Request, Response} from "express";
import {store} from "../db/fakeStore";

export const userPost = async (req: Request, res: Response) => {
    const id = store.addUser(req.body.sex, req.body.findSex);

    res.status(200).json({userId: id, status: "wait"})
};