import express, { Request, Response } from "express";
import { createPost, deletePost, getPostById, getPosts, login, register, updatePost } from "../controllers/controller";

const router = express.Router()

router.post("/register", register);
router.post("/login", login)
router.get("/", getPosts)
router.get("/post/:id", getPostById);
router.post("/", createPost);
router.put("/post/edit/:id", updatePost);
router.delete("/post/delete/:id", deletePost);

export default router