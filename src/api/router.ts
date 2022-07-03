import { Router } from "express";
import { logInHandler } from "./services/login";

const apiRouter = Router()

apiRouter.post("log-in", logInHandler)

export {apiRouter as default}