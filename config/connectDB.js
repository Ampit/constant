import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Use current db connection
    return;
  }
  console.log("Db Connected");
  // Use new db connection
  return await mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
};

export default connectDB;
