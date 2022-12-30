import { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import { injectable, inject } from "inversify";
import AuthRouter from "./auth/AuthRouter";

@injectable()
export default class BaseRouter {
  public router = Router({});

  constructor(
    @inject(AuthRouter)
    private authRouter: AuthRouter
  ) {
    this.router.use(cors());
    this.router.use("/user", this.authRouter.router);
  }
}
