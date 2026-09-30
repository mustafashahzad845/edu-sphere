import express from "express";
import { PORT, MONGODB_URI } from "./config/env.js";
import connectDB from "./config/db.js";
import { setServers } from "node:dns/promises";
import mongoose from "mongoose";
import userModel from "./models/User.js";
import { log } from "node:console";

const app = express();
setServers(["8.8.8.8", "1.1.1.1"]);

connectDB(MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",  (req, response) => {
  response.json({
    success: true,
  });
});
  app.post("/api/signup", async (request, response) => {
    const body = request.body;
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return response.json({
        status: false,
        message: "Required Fields Are Missing",
        data: null,
      });
    }

const userAlreadyExist = await userModel.find({email})
console.log(userAlreadyExist , "userAlreadyExist");

if(userAlreadyExist){
return response.json({
  status : false,
  message : "User Already exist",
  data : null
})
}

    const userObj = {
      fullName,
      email,
      password,
    };

    console.log(request.body);
   await userModel.create(userObj);
    response.json({
      status: true,
      message: "Account Created",
      data: userObj
    });
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
