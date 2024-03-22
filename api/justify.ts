import { Express, Request, Response } from "express";
import { authenticateToken, AuthenticatedRequest, Auth } from "../services/jwt";
import { CanIJustifyThis, justifyText } from "../services/words.controler";

const profileRoutes = (app: Express) => {
  app.post("/api/justify", authenticateToken,  async (req: AuthenticatedRequest, res: Response) => {
    const requestBody = req.body;
    const info = req.info as Auth

    if (CanIJustifyThis(requestBody, info.words) < 0) {
        res.status(402).json({ msg: "Payment Required"})
    } else {
        const justifiedText = justifyText(requestBody, 80)
        // res.status(200).({ msg: justifiedText })
        // console.log(justifiedText)
        res.end(justifiedText)
    }
  });

  app.get('/profile', authenticateToken, (req: AuthenticatedRequest, res) => {
    console.log(req.info?.login)
    res.json({ message: 'This is a protected route', user: req.info?.login });
  });

};

export default profileRoutes;