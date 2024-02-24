import express from "express";
import "dotenv/config";

//router
import { testRouter } from "./routers/test";
import { authRouter } from "./routers/auth";

const app = express();

app.use(express.json());
app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRouter);

//サーバー起動
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`${PORT}番で起動中...`);
});