import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb://localhost:27017/profile-db",
    {}
  );
  console.log(`MongoDB Connected: ${conn.connection.host}.`);
};

export default connectDB;
