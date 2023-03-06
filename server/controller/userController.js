import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    console.log("req", req.body);
    const { name, gender, dob, place, pinCode, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    emailExist
      ? res
          .status(403)
          .json({ message: "Email already exist try another email" })
      : console.log("emailExist", emailExist);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      gender,
      dob,
      place,
      pinCode,
      email,
      password: hashPassword,
      
    });
    user
      ? res.status(200).json({ message: "user created successfully" })
      : console.log("oops something went to wrong");
  } catch (error) {
    console.log("signup error", error);
    next(error);
  }
};

const singIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "20m" });
    res.cookie("accestoken", token, { maxAge: 600000, httpOnly: true });
    res.json({ accesstoken: token });
    return res.status(200).json({ messsage: "successfully login" });
  } catch (error) {
    console.log(error);
  }
};

export { signUp, singIn };
