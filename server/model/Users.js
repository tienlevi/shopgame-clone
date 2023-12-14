import mongoose from "mongoose";

const UserData = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tel: String,
  refreshToken: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("customers", UserData);

export default UserModel;
