require("dotenv").config();

export const database = {
  mongooseUri: process.env.MONGODB_URI || "",
};
export const auth = {
  tokenExpirationTime: process.env.TOKEN_EXPIRATION_TIME,
  tokenSecret: process.env.TOKEN_SECRET || "MY_BACKUP_TOKEN_SECRET_HAHA",
};
