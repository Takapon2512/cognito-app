import { Router } from "express";

export const testRouter = Router();

testRouter.get("/test", (req, res) => {
    return res.status(200).json({ message: "疎通完了" });
});