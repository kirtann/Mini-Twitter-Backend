import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chatup" })
    .then((data) => {
      console.log(`Connected to Database ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

export default connectDB;