const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Models/blacklist.model");
const { redisClient } = require("../configs/redis");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Please Login");
    }

    const isTokenValid = jwt.verify(token, "secret");
    if (!isTokenValid) {
      return res.send("Authentication failed Please Login!");
    }

    const isTokenBlacklisted = await redisClient.get(token);
    if (isTokenBlacklisted) {
      return res.send("Unauthorized");
    }
    req.body.userId = isTokenValid.userId;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { authenticator };
