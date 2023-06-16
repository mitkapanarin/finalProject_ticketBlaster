import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<USER>", process.env.DATABASE_USER);

export const initializeDatabase = async () => {
  mongoose
    .connect(DB_URL)
    .then((res) => console.log("connected to db"))
    .catch((err) => console.log("Unable to connect to db"));
  // try {
  //   await mongoose.connect(DB_URL, {
  //     // useNewUrlParser: true,
  //     // useUnifiedTopology: true,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
