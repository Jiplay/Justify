import { Express, Request, Response } from "express";
import { Profile } from "../models/profile.model";
import { checkProfileData } from "../services/profile.controler";
import { profileRepository } from "../queries/profile.repository";
import { authenticateToken, AuthenticatedRequest } from "../services/jwt";

const profileRoutes = (app: Express) => {
  app.post("/createProfile", authenticateToken,  async (req: AuthenticatedRequest, res: Response) => {
    const profileData: Profile = req.body;
    req.info !== undefined
    ? profileData.login = req.info.login
    : res.status(409).json({ msg: "Not Authorized" })

    let response
    if (checkProfileData(profileData) === true) {
      response = await profileRepository.createProfile(profileData)
      if (response === "OK") {
        res.status(200).json({ msg: "OK" })
      } else if (response === "KO") {
        res.status(500).json({ msg: "Internal Server Error" })
      } else  {
        res.status(409).json({ msg: response })
      }
    } else {
      res.status(409).json({ msg: "error in data" })
    }
  });

  app.get('/profile', authenticateToken, (req: AuthenticatedRequest, res) => {
    console.log(req.info?.login)
    res.json({ message: 'This is a protected route', user: req.info?.login });
  });

};

export default profileRoutes;