import mongoose from "mongoose";

const dbConnect = async (url: string) => {
  return mongoose.connect(url).then(() => {
    console.log("Connected mongodb");
  });
};

export default dbConnect;
