import { Handler, Request, Response } from "express";
import { validate } from "jsonschema";
import { getUserIdFromSession } from "./validateRequest";

const newMessageSchema = {
  "type": "object",
  "properties": {
      "message": {"type": "string"}
  },
  "required": ["message", "password"],
  "additionalProperties": false
}
type newMessageBody = {
  message: string
}
const newMessage: Handler = async function (req: Request, rsp: Response) {
  const userId = getUserIdFromSession(req, rsp)
  if (!userId) return;
  
  const errors = validate(req?.body, newMessageSchema).errors.map((a)=>a.message);
  if(errors.length){
      rsp.status(422).send({errors})
      return;
  }
  const body: newMessageBody = req.body;

  

    rsp.sendStatus(200)
};

export { newMessage as newMessageHandler };
