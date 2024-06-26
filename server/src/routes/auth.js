import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  try {
    const { name,username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name,username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    //   const token = jwt.sign({ id: user._id }, "secret");
    res.json({ userID: user._id });
  } catch (err) {
    res.json({ message: err.message });
  }
});

export { router as userRouter };
