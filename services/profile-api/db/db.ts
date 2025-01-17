import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect("uri", {});
  console.log(`MongoDB Connected: ${conn.connection.host}.`);
};

export default connectDB;
