import { Handler, Request, Response } from "express";
import { validate } from "jsonschema";
import db from "../dbSetup";
import { getUserIdFromSession } from "./auth/validateRequest";

const getMessagesSchema = {
    "type": "object",
    "properties": {
        "sort": { "type": "string", "pattern": "newer|older" },
        "limit": { "type": "string" },
        "timestamp": { "type": "string"}
    },
    "required": ["sort", "timestamp"]
}
type getMessagesSchema = {
    sort: string,
    timestamp: string,
    limit?: number
}

const getMessages: Handler = async function (req: Request, rsp: Response) {
    const userId = getUserIdFromSession(req, rsp)
    if (!userId) return;

    
    const errors = validate(req?.query, getMessagesSchema).errors.map((a) => a.message);
    if (errors.length) {
        rsp.status(422).send({ errors })
        return;
    }
    // @ts-ignore
    const info: getMessagesSchema = req.query
    
    let stm
    if (info.sort = "older") {
        stm = db.prepare('SELECT * FROM messages WHERE userId=? AND timestamp<=? ORDER BY timestamp ASC LIMIT ? ')
    } else {
        stm = db.prepare('SELECT * FROM messages WHERE userId=? AND timestamp>=? ORDER BY timestamp DESC LIMIT ? ')
    }
    const out = stm.all(userId, info.timestamp, info.limit || 20)

    console.log("info", info)
    console.log("stm", stm)
    console.log("out", out)

    rsp.status(200).send(JSON.stringify(out))
};

export { getMessages as getMessagesHandler };
