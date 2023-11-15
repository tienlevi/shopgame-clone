import mongoose from "mongoose";

const UserData = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  tel: Number,
  refreshToken: String,
});

const UserModel = mongoose.model("customers", UserData);

export default UserModel;
