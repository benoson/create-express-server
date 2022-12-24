import { injectable } from "inversify";
import { inject } from "inversify/lib/annotation/inject";
import { IUser, IUserRegistration, IUserResponse, IUserSignIn } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "../repositories/AuthRepository";

@injectable()
export default class AuthService {
  public constructor(
    @inject(AuthRepository)
    private authRepository: AuthRepository
  ) {}

  public register = async (userRegistrationData: IUserRegistration): Promise<any> => {
    if (userRegistrationData.password !== userRegistrationData.confirmPassword) {
      return {
        ok: false,
        message: "Your passwords do not match",
      };
    }

    const hashedPassword: IUserRegistration["password"] = await this.generateHashedPassword(
      userRegistrationData.password
    );

    userRegistrationData.password = hashedPassword;
    return await this.authRepository.register(userRegistrationData);
  };

  public signIn = async (userSignInData: IUserSignIn): Promise<any> => {
    const foundUser: IUser | null = await this.authRepository.findUserByEmail(userSignInData.email);
    if (!foundUser) {
      return {
        ok: false,
        message: "Please make sure your credentials are correct",
      };
    }

    if (await this.validateHashedPassword(foundUser.password, userSignInData.password)) {
      return {
        ok: true,
        user: this.generateUserResponse(foundUser),
        token: this.generateToken(foundUser.password),
      };
    }
  };

  public deleteUser = async (userId: IUser["id"]): Promise<any> => {
    return await this.authRepository.deleteUser(userId);
  };

  private generateHashedPassword = async (
    originalPassword: IUserRegistration["password"]
  ): Promise<IUserRegistration["password"]> => {
    return await bcrypt.hash(originalPassword, 4);
  };

  private validateHashedPassword = async (
    hashedPassword: IUser["password"],
    originalPassword: IUser["password"]
  ): Promise<boolean> => {
    return await bcrypt.compare(originalPassword, hashedPassword);
  };

  private generateToken = (password: IUser["password"]): string => {
    return jwt.sign(password, "MY-SECRET-MOVE-TO-ENV");
  };

  private generateUserResponse = (user: IUser): IUserResponse => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };
}
