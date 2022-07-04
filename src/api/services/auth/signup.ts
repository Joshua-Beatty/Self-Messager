import { Handler, Request, Response } from "express";
import console from 'node-color-log'
import { validate } from 'jsonschema';
import bcrypt from 'bcrypt'
import db from '../../dbSetup'
import sendNewSessionInfo from './sessionGenerator'
const signUpSchema = {
    "type": "object",
    "properties": {
        "username": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["username", "password"],
    "additionalProperties": false
}
type signUpBody = {
    username: string
    password: string
}
const signUp: Handler = async function (req: Request, rsp: Response) {
    const errors = validate(req?.body, signUpSchema).errors.map((a)=>a.message);
    if(req?.body?.username?.length <= 5){
        errors.push("username must be longer then 5 characters")
    }
    if(req?.body?.password?.length <= 8){
        errors.push("password must be longer then 8 characters")
    }
    if(errors.length){
        rsp.status(422).send({errors})
        return;
    }
    const body: signUpBody = req.body;

    const checkExisting: Number = db.prepare('SELECT EXISTS(SELECT 1 FROM users WHERE username=? LIMIT 1);').pluck().get(body.username);
    if(checkExisting != 0){
        rsp.status(409).send({errors:["Username Taken"]})
        return;
    }

    const pass = await bcrypt.hash(body.password, 10); 
    const userId: Number = db.prepare('INSERT INTO users(username, password) VALUES(?, ?) RETURNING userId').get(body.username, pass).userId
    
    //const userId: string = db.prepare('SELECT userId from users where username=?').get(body.username).userId
    //rsp.send(200)
    sendNewSessionInfo(req, rsp, userId)
};
 
export { signUp as signUpHandler };
