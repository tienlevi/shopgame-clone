import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import morgan from "morgan";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import UserModel from "./model/Users.js";
import Connect from "./model/Connect.js";
const app = express();
const port = 5000;
Connect();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const user = await UserModel.findOne({ refreshToken });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET
    );
    // res.cookie("accessToken",accessToken)
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "10s",
      }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_REFRESH_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      username: username,
      password: password,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user", authenticateToken, async (req, res) => {
  const { username } = req.user;

  try {
    const user = await UserModel.findOne({ username });
    // console.log(user);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

// app.post("/logout", (req, res) => {
//   res.status(200).json({ message: "Logout successful" });
// });

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, tel } = req.body;
    const refreshToken = generateRefreshToken(username);
    const newUser = new UserModel({
      username,
      password,
      email,
      tel,
      refreshToken: refreshToken,
    });
    await newUser.save();
    res.json(newUser);
    console.log(newUser);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => console.log(`localhost is http://localhost:${port}`));
