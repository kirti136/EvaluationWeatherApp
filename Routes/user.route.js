const { Router } = require("express");
const {
  registration,
  login,
  update,
  deleted,
  logout,
} = require("../Controllers/user.controller");
const { authenticator } = require("../Middlewares/authentication.middleware");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ message: "Welcome to user Route" });
});
userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.get("logout", authenticator, logout);
userRouter.patch("/update", update);
userRouter.delete("/delete", deleted);

module.exports = {
  userRouter,
};
