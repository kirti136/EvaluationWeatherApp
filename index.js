const express = require("express");
require("dotenv").config();
const { connectionDB } = require("./configs/db");
const { userRouter } = require("./Routes/user.route");
const { redisClient } = require("./configs/redis");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send(await redisClient.get("name"));
});

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  connectionDB();
  console.log(`Server listening on port ${process.env.PORT}`);
});
