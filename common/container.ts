import { Container } from "inversify";
import AuthRepository from "../repositories/AuthRepository";
import AuthRouter from "../routers/AuthRouter";
import BaseRouter from "../routers/BaseRouter";
import AuthService from "../services/AuthService";

const container = new Container();

container.bind<BaseRouter>(BaseRouter).toSelf();

container.bind<AuthRouter>(AuthRouter).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthRepository>(AuthRepository).toSelf();

export default container;
