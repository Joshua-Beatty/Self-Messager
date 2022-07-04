import { json, Router } from "express";
import { logInHandler } from "./services/auth/login";
import { signUpHandler } from "./services/auth/signup";
import { newMessageHandler } from "./services/newMessage";
import cookieParser from "cookie-parser";

const apiRouter = Router();


apiRouter.use(cookieParser());
apiRouter.use(json());
apiRouter.post("/auth/login", logInHandler);
apiRouter.post("/auth/signup", signUpHandler);
apiRouter.post("/newMessage", newMessageHandler);

export { apiRouter as default };
