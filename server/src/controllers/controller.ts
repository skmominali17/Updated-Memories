import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../models/postModel";
import { CustomRequest } from "../middlewares/middleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Set token in authorization header
    res.setHeader("Authorization", `Bearer ${token}`);

    // Send response
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Set token in authorization header
    res.setHeader("Authorization", `Bearer ${token}`);

    // Return success and token in the response
    res
      .status(200)
      .json({ message: "Login successful", token, userId: user._id, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getPosts = async (req: CustomRequest, res: Response) => {
  try {
    const posts = await Post.find();
    // console.log(req.user);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const availablePosts = await Post.find();
    res
      .status(200)
      .json({ message: "Post deleted successfully", availablePosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const createPost = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const { title, message, tags, image } = req.body;

    const post = new Post({
      title,
      message,
      tags,
      image,
      userId: req.user._id,
    });

    await post.save();
    res.status(200).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        message: req.body.message,
        tags: req.body.tags,
        image: req.body.image,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const likePost = async (req: Request, res: Response) => {
  const postId = req.params;
  const Updatedpost = await Post.findByIdAndUpdate(
    postId.id,
    { $inc: { likeCount: 1 } },
    { new: true }
  );
  res.json(Updatedpost);
  console.log(Updatedpost);
  console.log(postId.id);
  console.log("HI!");
  //   res.json({ message: "POST LIKED!" });
};
