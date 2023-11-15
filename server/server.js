import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import UserModel from "./model/Users.js";
import Connect from "./model/Connect.js";
const app = express();
const port = 5000;
Connect();
dotenv.config();
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

let refreshTokens = [];

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
  },
  {
    id: 2,
    username: "chachtien",
    password: "tien2004",
  },
  {
    id: 3,
    username: "tienlevi",
    password: "chuling",
  },
];

function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
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

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "60s",
  });
};

const generateNewAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_ACCESS_SECRET);
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET);
};

app.post("/refresh", (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(token)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  console.log(token);
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateNewAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log(refreshToken);

    refreshTokens.push(refreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    });
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const accessToken = jwt.sign({ username }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET);
    return res.json({
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

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await UserModel.findOne({
//     username,
//     password,
//   });
//   try {
//     const refreshToken = generateRefreshToken(user);
//     const accessToken = generateAccessToken(user);
//     refreshTokens.push(refreshToken);
//     res.cookie("AccessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       path: "/",
//       maxAge: 15000,
//     });
//     if (user) {
//       res.json({
//         username: username,
//         password: password,
//         accessToken,
//         refreshToken,
//       });
//       res.status(200).json("Login success");
//     } else {
//       res.status(400).json("Username or password incorrect!");
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
//   return user;
// });

app.get("/user", authenticateToken, (req, res) => {
  const user = users.find((u) => u.username === req.data.username);
  res.status(200).json(user);
});

app.get("/username", async (req, res) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await UserModel.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/signup", async (req, res) => {
  // const accessToken = generateAccessToken(user);
  try {
    const { username, email, password, tel } = req.body;
    const refreshToken = generateRefreshToken(username);
    refreshTokens.push(refreshToken);
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
