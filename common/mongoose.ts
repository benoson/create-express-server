import mongoose from "mongoose";
import * as config from "../common/config";

const initMongo = () => {
  mongoose.connect(config.database.mongooseUri);
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

export default initMongo;
