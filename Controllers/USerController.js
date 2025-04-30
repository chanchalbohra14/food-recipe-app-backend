import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  console.log("api hit");
  try {
    const { email, password, name } = req.body;
    console.log("req body", req.body);
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "name ,Email and password is required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email is already exist" });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPwd,
    });
    return res.status(200).json({ user: newUser });
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("reqbody", req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }
    let user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);

      const { name, _id } = user;
      console.log("data", name, _id, token);
      return res.status(200).json({ _id, email: user.email, name, token });
    } else {
      return res.status(400).json({ error: "Invaild credientials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "failed to delete" });
    }
    res.json(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
