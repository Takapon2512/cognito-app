import { Router } from "express";
import { CognitoIdentityServiceProvider } from "aws-sdk";

export const authRouter = Router();

const { 
    USER_POOL_ID,
    COGNITO_CLIENT_ID,
    REGION,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY_ID
} = process.env;

const cognito = new CognitoIdentityServiceProvider({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID
});

authRouter.get("registered", (req, res) => {
    return res.status(200).json({ message: "確認完了" })
});

authRouter.get("/get_user", async (req, res) => {
    if (!USER_POOL_ID || !COGNITO_CLIENT_ID || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY_ID) {
        return res.status(400).json({ massage: "情報が不足しています" });
    };

    const params = {
        UserPoolId: USER_POOL_ID,
        Username: "test@gmail.com"
    };

    try {
        const response = await cognito.adminGetUser(params).promise();
        return res.status(200).json({ 
            message: "ユーザー情報を取得しました。",
            user: response
        });
    } catch (error) {
        return res.status(500).json({ message: "ユーザー情報を取得できませんでした。" });
    };
});

authRouter.post("/create_user", async (req, res) => {
    if (!USER_POOL_ID || !COGNITO_CLIENT_ID || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY_ID) {
        return res.status(400).json({ massage: "情報が不足しています" });
    };

    const params = {
        ClientId: COGNITO_CLIENT_ID,
        Username: "test@gmail.com",
        Password: "Test_1234?",
        UserAttributes: [
            {
                Name: 'email',
                Value: 'test@gmail.com'
            }
        ]
    };

    try {
        const response = await cognito.signUp(params).promise();
        return res.status(200).json({
            message: 'ユーザー登録に成功しました',
            user: response
        });
    } catch (error) {
        return res.status(500).json({
            message: 'ユーザー登録に失敗しました',
            error: error
        });
    };
});