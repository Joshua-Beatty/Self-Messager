import { Request, Response } from "express";
import db from "../../dbSetup";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken"
function createAndSendNewSessionInfo( req: Request, rsp: Response, userId: string | Number, ) {
  const sessionId = uuid();

  const userAgent = req.headers["user-agent"];

  rsp.setHeader(
    "Set-Cookie",
    [
      `__Secure-sessionId=${sessionId}; Secure; HttpOnly; SameSite=Strict; Path=/api`,
    ],
  );
  const expiry = new Date()
  expiry.setMinutes(expiry.getMinutes() + 30)
  db.prepare("INSERT INTO sessions(userId,sessionId, userAgent, expiry) VALUES(?, ?, ?, ?);").run(userId, sessionId, userAgent, expiry.toISOString())


  rsp.sendStatus(200);
}

export { createAndSendNewSessionInfo as default };
