require("dotenv").config();

export const database = {
  mongooseUri: process.env.MONGODB_URI || "",
};
