import { Handler, Request, Response } from "express";
import { validate } from 'jsonschema';
import db from '../dbSetup'
import bcrypt from 'bcrypt'
import sendNewSessionInfo from './sessionGenerator'
const logInSchema = {
    "type": "object",
    "properties": {
        "username": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["username", "password"],
    "additionalProperties": false
}
type logInBody = {
    username: string
    password: string
}
const logIn: Handler = function (req: Request, rsp: Response) {
    console.log(req.body)
    console.debug(req.body)
    const errors = validate(req.body, logInSchema).errors.map((a)=>a.message);
    if(errors.length){
        rsp.status(422).send({errors})
        return;
    }
    const body: logInBody = req.body;
    
    const hashedPass: {password: string, userId: Number} | undefined = db.prepare("SELECT password, userId FROM users WHERE username=?").get(body.username)

    
    if(!hashedPass){
        rsp.status(401).send({errors: ["Username amd/or Password is not valid"]})
        return;
    }

    const valid = bcrypt.compare(body.password, hashedPass.password)

    if(!valid){
        rsp.status(401).send({errors: ["Username amd/or Password is not valid"]})
        return;
    }
    
    sendNewSessionInfo(req, rsp, hashedPass.userId)
};

export { logIn as logInHandler };
