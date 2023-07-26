const express = require("express");
const session = require("express-session"); // Session
const app = express();
const port = 3000; // HTML, CSS

const path = require("path");

// const cors = require("cors");
// app.use(cors({ origin: true, credentials: true }));

// cookie parser
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoute.js");
const postRouter = require("./routes/postRoute.js");

// Middleware
app.use(express.json()); // req.body parser
app.use(cookieParser()); // cookie parser
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 본문 Parsing
app.use(
  session({
    secret: "jboard", // Session을 암호화하는데 사용되는 임의의 문자열
    resave: false,
    saveUninitialized: false,
  })
);

// API 라우팅
app.use("/api", [userRouter, postRouter]);

// HTML, CSS
app.use(express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(port, "포트가 열렸습니다~^^");
});
