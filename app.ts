import express, { Express, Request, Response } from "express";
import profileRoute from "./api/justify";
import 'dotenv/config'

import { connectToMongoDB } from "./services/mongodb";
import { accountCreationCheck, loginCheck } from "./services/user.controler";
const app: Express = express();
const port = process.env.PORT || 80;
const dailyWordsFree = 80000

app.use(express.text());
app.use(express.json());

profileRoute(app)

// Route for user login 
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  connectToMongoDB().
  then(async () => {
    const token = await loginCheck({ login: username, password: password, words: 713 })
    res.json({ token });
  })
  .catch(() => {
    res.status(500).json({ err: "KO" });
  });
});

app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  connectToMongoDB().
  then(async () => {
    res.status(200).json({ state: await accountCreationCheck({ login: username, password: password, words:dailyWordsFree}) });
  })
  .catch(() => {
    res.status(500).json({ err: "KO" });
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});