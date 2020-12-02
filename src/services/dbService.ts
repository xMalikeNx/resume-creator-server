import mongoose, { CallbackError } from "mongoose";

export const connectDb = (): Promise<CallbackError | void> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.DB_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          reject(err);
        }
        console.log(`connected to database`);
        resolve();
      }
    );
  });
};
