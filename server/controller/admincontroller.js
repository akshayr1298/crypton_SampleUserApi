import Admin from "../models/adminModels.js";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401).json({ message: "Invalid email" });
    }
    const passwordCheck = await bcrypt.compare(password, admin.password);
    if (!passwordCheck) {
      res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "login successs" });
  } catch (error) {
    console.log("error", error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log("error", error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;
    await User.updateOne({ _id: id }, { $set: { name, email } });
    return res.status(200).json({ message: "update successfully" });
  } catch (error) {
    console.log("error", error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ id: id });
    return res.status(200).json({message:"delete successfully"})
  } catch (error) {
    console.log("error", error);
  }
};

export { login, getUsers, updateUser, deleteUser };
