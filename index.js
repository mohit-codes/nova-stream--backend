require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/user.router");
const videoRouter = require("./routers/video.router");
const playlistRouter = require("./routers/playlist.router");
const authenticate = require("./middleware/authenticate");
const { initializeDBConnection } = require("./config/db.config");
const app = express();
app.use(bodyParser.json());
app.use(cors());

initializeDBConnection();

app.get("/", (req, res) => {
  return res.json({ status: "Welcome to Nova stream server" });
});

app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/playlist", authenticate, playlistRouter);

app.listen(port, () => {
  console.log(`backend server running on port ${port}`);
});
