import { Handler, Request, Response  }  from "express";

const index: Handler = function(req: Request, rsp: Response){
    rsp.send("Hello World")
}

export  { index as indexHandler }