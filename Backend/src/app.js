const express = require('express');
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.routes")
const cors = require("cors");


const app = express();
app.use(
  cors({
    origin: "http://localhost:5174", 
    credentials: true, 
  }),
);
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);

module.exports = app;