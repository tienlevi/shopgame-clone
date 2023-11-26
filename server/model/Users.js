import mongoose from "mongoose";

const UserData = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: Number,
  refreshToken: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("customers", UserData);

export default UserModel;
