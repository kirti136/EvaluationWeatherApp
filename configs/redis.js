const redis = require("redis");
const ioredis = require("ioredis");
require("dotenv").config();

const redisClient = redis.createClient();

redisClient.on("connect", async () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.log("Redis connection error: " + err);
});

redisClient.connect();

module.exports = {
  redisClient,
};
