import "reflect-metadata";
import { injectable } from "inversify";
import User, { IUser, IUserRegistration, IUserSignIn } from "../../models/UserModel";

@injectable()
export default class AuthRepository {
  public constructor() {}

  public register = async (userRegistrationData: IUserRegistration): Promise<IUser> => {
    const user = new User(userRegistrationData);
    return await user.save();
  };

  public findUserByEmail = async (email: IUser["email"]): Promise<IUser | null> => {
    return await User.findOne({ email });
  };

  public deleteUserById = async (userId: IUser["id"]): Promise<any> => {
    await User.findByIdAndRemove(userId);
  };
}
