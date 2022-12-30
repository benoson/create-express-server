import { Container } from "inversify";
import AuthRepository from "../repositories/auth/AuthRepository";
import AuthRouter from "../routers/auth/AuthRouter";
import BaseRouter from "../routers/BaseRouter";
import AuthService from "../services/auth/AuthService";
import ClientResponses from "./client-responses/ClientResponses";

const container = new Container();

container.bind<BaseRouter>(BaseRouter).toSelf();

container.bind<AuthRouter>(AuthRouter).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<ClientResponses>(ClientResponses).toSelf();

export default container;
