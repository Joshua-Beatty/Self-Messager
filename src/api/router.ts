import { Router, json } from "express";
import { logInHandler } from "./services/login";
import { newMessageHandler } from "./services/newMessage";
import { signUpHandler } from "./services/signup";
import cookieParser  from 'cookie-parser'


const apiRouter = Router()
/* tsc-ignore following line */
apiRouter.use(cookieParser())
apiRouter.use(json())
apiRouter.post("/auth/login", logInHandler)
apiRouter.post("/auth/signup", signUpHandler)
apiRouter.post("/newMessage", newMessageHandler)

export {apiRouter as default}