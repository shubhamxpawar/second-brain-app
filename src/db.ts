import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongo_uri = process.env.MONGO_URI;

    if (!mongo_uri) throw new Error(`mongo_uri is missing`);
    await mongoose.connect(mongo_uri);

    console.log("Connected to DB:", mongoose.connection.name);
    console.log("✅ MongoDB connected!");
  } catch (error) {
    console.error("❌ Mongo connection error : ", error);
  }
};

export default connectDB;
