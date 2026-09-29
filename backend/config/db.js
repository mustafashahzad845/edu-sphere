import mongoose from "mongoose";

const connectDB = (URI) => {
  mongoose
    .connect(URI)
    .then((result) => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("Error in MongoDB Connection: ", err);
    });
};

export default connectDB;
