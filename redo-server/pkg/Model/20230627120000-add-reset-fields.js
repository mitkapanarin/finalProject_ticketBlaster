import mongoose from "mongoose";
import { UserModel } from "./userModel.js"; // Update the path to your UserModel file
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<USER>", process.env.DATABASE_USER);

const runMigration = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update the schema
    await UserModel.updateMany(
      {},
      {
        $set: {
          resetToken: null,
          resetTokenExpiration: null,
        },
      }
    );

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.disconnect();
  }
};

runMigration();
