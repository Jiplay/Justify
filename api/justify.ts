import { Express, Request, Response } from "express";
import { authenticateToken, AuthenticatedRequest, Auth } from "../services/jwt";
import { CanIJustifyThis } from "../services/words.controler";

const profileRoutes = (app: Express) => {
  app.post("/api/justify", authenticateToken,  async (req: AuthenticatedRequest, res: Response) => {
    const requestBody = req.body;
    const info = req.info as Auth

    if (CanIJustifyThis(requestBody, info.words) != true) {
        res.status(402).json({ msg: "Payment Required"})
    } else {
        console.log('Request Body:', requestBody, "info", req.info);
        res.status(200).json({ msg: "OK words : " + info.words })
    }
  });

  app.get('/profile', authenticateToken, (req: AuthenticatedRequest, res) => {
    console.log(req.info?.login)
    res.json({ message: 'This is a protected route', user: req.info?.login });
  });

};

export default profileRoutes;