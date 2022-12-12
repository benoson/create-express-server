import { injectable } from "inversify";
import { inject } from "inversify/lib/annotation/inject";
import { IUser, IUserRegistration, IUserSignIn } from "../models/UserModel";
import AuthRepository from "../repositories/AuthRepository";

@injectable()
export default class AuthService {
  public constructor(
    @inject(AuthRepository)
    private authRepository: AuthRepository
  ) {}

  public register = async (userRegistrationData: IUserRegistration): Promise<any> => {
    return await this.authRepository.register(userRegistrationData);
  };

  public signIn = async (userSignInData: IUserSignIn): Promise<any> => {
    return await this.authRepository.signIn(userSignInData);
  };

  public deleteUser = async (userId: IUser["id"]): Promise<any> => {
    return await this.authRepository.deleteUser(userId);
  };
}
