const express = require("express");
import container from "./common/container";
import initMongo from "./common/mongoose";
import BaseRouter from "./routers/BaseRouter";

const app = express();
app.use(express.json());
initMongo();

const baseRouter = container.get(BaseRouter);
app.use(baseRouter.router);

app.listen(3015, () => {
  console.log("Running an express server at port 3015");
});
