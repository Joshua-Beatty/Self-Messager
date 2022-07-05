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
  const create = new Date()

  db.prepare("INSERT INTO sessions(userId, sessionId, userAgent, lastUsed) VALUES(?, ?, ?, ?);").run(userId, sessionId, userAgent, create.toISOString())


  rsp.sendStatus(200);
} 

export { createAndSendNewSessionInfo as default };
