import { Request, Response } from "express";
import db from "../../dbSetup"
const validator = function (req: Request, rsp: Response): string | void {
    const sessionId = req.cookies?.["__Secure-sessionId"]
    //console.debug(req.headers)
    //console.debug(req.cookies)
    //console.log(sessionId)
    if(!sessionId){
        rsp.status(401).send({errors: ["Session ID Not Found"]})
        return;
    }

    const create = new Date()
    const session = db.prepare("UPDATE sessions SET lastUsed=? WHERE sessionId=? RETURNING userId").get(create.toISOString(), sessionId)

    if(!session){
        rsp.status(401).send({errors: ["Invalid Session ID"]})
        return;
    }

    return session.userId;
}

export { validator as getUserIdFromSession };