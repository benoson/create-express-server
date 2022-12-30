import { NextFunction, Request, Response, Router } from "express";
import { injectable, inject } from "inversify";
import { IUser, IUserRegistration, IUserSignIn } from "../../models/UserModel";
import AuthService from "../../services/auth/AuthService";

@injectable()
export default class AuthRouter {
  public router = Router();

  public constructor(
    @inject(AuthService)
    private authService: AuthService
  ) {
    this.router.post("/", this.register);
    this.router.post("/sign-in", this.signIn);
    this.router.delete("/:userId", this.deleteUser);
  }

  private register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userRegistrationData: IUserRegistration = req.body;
      const result = await this.authService.register(userRegistrationData);
      res.json(result);
    } catch (error: any) {
      res.status(400).send(error?.message);
    }
  };

  private signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userSignInData: IUserSignIn = req.body;
      const result = await this.authService.signIn(userSignInData);
      res.json(result);
    } catch (error: any) {
      res.status(400).send(error?.message);
    }
  };

  private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId: IUser["id"] = req.params.userId;
      const result = await this.authService.deleteUser(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).send(error?.message);
    }
  };
}
