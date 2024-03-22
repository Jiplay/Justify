import * as mongoose from "mongoose";
import { Mongoose } from "mongoose";
require("dotenv").config();
let conn: Promise<Mongoose | void> | null = null;

export async function connectToMongoDB() {
  try {
    const PSW = process.env.PSW;
    if (!conn) {
      console.info("[Mongoose]", "Connect to db");
      conn = mongoose
        .connect(
            `mongodb+srv://profile:${PSW}@aperta.ylsrtkk.mongodb.net/?retryWrites=true&w=majority`,
          {
            autoCreate: true,
            autoIndex: true,
          },
        )
        .catch((err) => {
          console.error("[Mongoose]", err);
          conn = null;
          throw err;
        });
    }
    await conn;
  } catch (err) {
    console.error("[Mongoose] catch", err);
    throw "Internal error";
  }
}