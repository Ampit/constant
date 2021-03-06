import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.development.local" });

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Use current db connection
    return;
  }
  console.log("Db Connected");
  // Use new db connection
  try {
    return await mongoose.connect(process.env.DATABASE_URL!, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    return Error(`Couldn't Connect: ${error}`);
  }
};

export default connectDB;
