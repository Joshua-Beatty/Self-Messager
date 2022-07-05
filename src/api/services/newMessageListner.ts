import { Handler, Request, response, Response } from "express";
import { v4 as uuid } from "uuid";
import db from "../dbSetup";
import { getUserIdFromSession } from "./auth/validateRequest";
const listeners: Record<string, Record<string, Response>> = {}

const messageListener: Handler = async function (req: Request, rsp: Response) {
    const userId = getUserIdFromSession(req, rsp)
    if (!userId) return;
    if (!listeners[userId]) {
        listeners[userId] = {}
    }
    const connectionId = uuid()
    listeners[userId][connectionId] = rsp
    rsp.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    rsp.flushHeaders();
    rsp.write('retry: 10000\n\n');
    
    req.on("close", function () {;
        delete listeners[userId][connectionId]
        if (Object.keys(listeners[userId]).length)
            delete listeners[userId]
    });
};

const newMessageHandler = function(userId: string, message:string, isFile: boolean){
    if(listeners[userId]){
        for(const response of Object.values(listeners[userId])){
            console.log("Sending message")
            
            response.write(`data: ${JSON.stringify({"message": message, isFile, timeStamp: new Date().toISOString()})}\n\n`)
        }
    }
}

export { messageListener as messageListenerHandler, newMessageHandler };
