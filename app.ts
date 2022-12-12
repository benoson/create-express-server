const express = require("express");
const cors = require("cors");
import * as AuthRouter from "./routers/AuthRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", AuthRouter);

app.listen(3015, () => {
  console.log("Running an express server with Postgress at port 3015");
});
