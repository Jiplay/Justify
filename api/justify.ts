import { Express, Request, Response } from "express";
import { authenticateToken, AuthenticatedRequest, Auth } from "../services/jwt";
import { CanIJustifyThis, justifyText } from "../services/words.controler";
import { connectToMongoDB } from "../services/mongodb";

const profileRoutes = (app: Express) => {
  app.post("/api/justify", authenticateToken,  async (req: AuthenticatedRequest, res: Response) => {
    connectToMongoDB()
    const requestBody = req.body;
    const info = req.info as Auth

    const wordsNeeded = await CanIJustifyThis(requestBody, info.login)
    if (wordsNeeded < 0) {
        res.status(402).json({ msg: "Payment Required"})
    } else {
        const justifiedText = justifyText(requestBody, 80)

        res.end(justifiedText)
    }
  });

  app.get('/words', authenticateToken, (req: AuthenticatedRequest, res) => {
  });

};

export default profileRoutes;