import { Request, Response } from "express";
import PostMessage from "../models/postModel";
import mongoose from "mongoose";
import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    // taking inputs from the body
    const { name, email, password } = req.body;
    // hashing the password with bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    // if user already exists in DB then return
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if user dosent exists then create a user in DB
    const user = await User.create({ name, email, password: hashedPassword });
    await user.save();
    // Generate token with JWT
    const token = jwt.sign({ id: user._id }, "shhh", { expiresIn: "1h" });
    // set the token in authorization header
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  // taking inputs from body
  const { email, password } = req.body;
  // if email does not exists in DB then return
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // if email exists then verify the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate Token
  const token = jwt.sign({ id: user._id }, "shhh", { expiresIn: "1h" });
  // set the authorization header
  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(200).json({ message: "Login Succesfully" });
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const post = await PostMessage.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    await PostMessage.findByIdAndDelete(req.params.id);
    const availablePosts = await PostMessage.find();
    res
      .status(200)
      .json({ message: "Post deleted successfully", availablePosts });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new PostMessage({
      title: req.body.Title,
      message: req.body.Message,
      tags: req.body.Tags,
      image: req.body.Image,
    });

    await post.save();
    res.status(200).json({ message: "Post Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    const post = await PostMessage.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.Title,
        message: req.body.Message,
        tags: req.body.Tags,
        image: req.body.Image,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Post Updated Successfully", post });
  } catch (error) {}
};
