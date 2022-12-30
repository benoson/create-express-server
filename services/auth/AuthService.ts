import { injectable, inject } from "inversify";
import { IUser, IUserRegistration, IUserResponse, IUserSignIn } from "../../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "../../repositories/auth/AuthRepository";
import * as config from "../../common/config";
import { IServiceResult } from "../../common/interfaces/IServiceResult";
import ClientResponses from "../../common/client-responses/ClientResponses";

@injectable()
export default class AuthService {
  public constructor(
    @inject(AuthRepository)
    private authRepository: AuthRepository,

    @inject(ClientResponses)
    private clientResponses: ClientResponses
  ) {}

  public register = async (userRegistrationData: IUserRegistration): Promise<IServiceResult<IUser>> => {
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
    return {
      ok: true,
      data: await this.authRepository.register(userRegistrationData),
    };
  };

  public signIn = async (
    userSignInData: IUserSignIn
  ): Promise<IServiceResult<{ user: IUserResponse; token: string }>> => {
    const foundUser: IUser | null = await this.authRepository.findUserByEmail(userSignInData.email);
    if (!foundUser) {
      return this.clientResponses.getCredentialsDoNotMatchError();
    }

    if (await this.validateHashedPassword(foundUser.password, userSignInData.password)) {
      return {
        ok: true,
        data: {
          user: this.generateUserResponse(foundUser),
          token: this.generateToken(foundUser.password),
        },
      };
    }

    return this.clientResponses.getCredentialsDoNotMatchError();
  };

  public deleteUser = async (userId: IUser["id"]): Promise<IServiceResult<IUser["id"]>> => {
    await this.authRepository.deleteUserById(userId);
    return {
      ok: true,
      data: userId,
    };
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
    return jwt.sign(password, config.auth.tokenSecret, {
      expiresIn: config.auth.tokenExpirationTime,
    });
  };

  private generateUserResponse = (user: IUser): IUserResponse => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };
}
