import { injectable } from "inversify";

interface IResponse {
  code: string;
  message: string;
  ok: boolean;
}

export enum ResponseCode {
  GeneralError = "GENERAL_ERROR",
  CredentialsDoNotMatch = "CREDENTIALS_DO_NOT_MATCH",
  ValidationError = "VALIDATION_ERROR",
  NotFound = "NOT_FOUND",
  NotAllowed = "NOT_ALLOWED",
  AlreadyExists = "ALREADY_EXISTS",
  Conflict = "CONFLICT",
  NoPermissions = "NO_PERMISSIONS",
}

@injectable()
export default class ClientResponses {
  getGeneralError(message: IResponse["message"], code?: ResponseCode): IResponse {
    return {
      ok: false,
      message,
      code: code || ResponseCode.GeneralError,
    };
  }

  getCredentialsDoNotMatchError(): IResponse {
    return {
      ok: false,
      message: "Please make sure your credentials are correct",
      code: ResponseCode.CredentialsDoNotMatch,
    };
  }

  getNotFoundError(message: IResponse["message"]): IResponse {
    return {
      ok: false,
      message,
      code: ResponseCode.NotFound,
    };
  }
}
