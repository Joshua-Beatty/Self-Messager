import { Router } from "express";
import { indexHandler } from "./services/index";

const appRouter = Router()

appRouter.get("/", indexHandler)

export {appRouter as default}