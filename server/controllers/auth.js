import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Invalid Login credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token,
      //  {
      //   httpOnly: true,
      //   secure: true,
      // }
      )
      .status(200)
      .json(others);
      console.log("signedin") 
  } catch (err) {
    next(err);
    console.log("not")
  }
};

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User Created Successfully");
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, 
        // {
        //   httpOnly: true,
        //   secure: true,
        // }
        )
        .status(200)
        .json(user._doc);
    } else {
      const { name, email, img } = req.body;
      const newUser = new User({
        name,
        email,
        img,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token,
        //  {
        //   httpOnly: true,
        //   secure: true,
        // }
        )
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
