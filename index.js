const express = require("express");
const dotenv = require("dotenv").config();

const userRoutes = require("./api/UserRoutes");
const postRoutes = require("./api/PostRoutes");
const commentsRoutes = require("./api/CommentRoutes");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// Check database connect
// db.authenticate()
//   .then(() => console.log("Data connected"))
//   .catch((err) => console.log("Fail", err));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(4000, () => {
  console.log("Backend is running");
});
