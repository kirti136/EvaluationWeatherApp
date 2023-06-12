const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../configs/redis");

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserPresent = await UserModel.findOne({ email });
    if (isUserPresent)
      res.status(404).send("User already exists, Please Login");

    const hash = await bcrypt.hash(password, 5);
    const newUser = new user({ name, email, password: hash });
    await newUser.save();
    res.status(200).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent) res.status(404).send({ message: "User not found" });

    const ispasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );
    if (!ispasswordCorrect) {
      return res.status(400).send({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { useId: isUserPresent._id, blogs: isUserPresent.blogs },
      "webtoken",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ message: "login success", token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send({ message: "Invalid token" });
    }

    await redisClient.set(req.body.userdId, token);

    res.status(200).send({ message: "Logout Success" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const update = (req, res) => {};
const deleted = (req, res) => {};

module.exports = {
  registration,
  login,
  update,
  deleted,
  logout,
};
