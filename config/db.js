import mongoose from "mongoose";

let connectDB = async (dburl) => {
  try {
    mongoose.connect(dburl);
    console.log("database connected successfully");
  } catch (error) {
    console.log(`error while connecting database ${error}`);
  }
};

export default connectDB;
