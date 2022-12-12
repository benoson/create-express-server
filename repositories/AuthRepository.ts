import { injectable } from "inversify";
import User, { IUser, IUserRegistration, IUserSignIn } from "../models/UserModel";

@injectable()
export default class AuthRepository {
  public constructor() {}

  public register = async (userRegistrationData: IUserRegistration): Promise<any> => {
    const user = new User(userRegistrationData);
    return await user.save();
  };

  public signIn = async (userSignInData: IUserSignIn): Promise<any> => {
    // await ....mongo
  };

  public deleteUser = async (userId: IUser["id"]): Promise<any> => {
    // await ....mongo
  };
}
