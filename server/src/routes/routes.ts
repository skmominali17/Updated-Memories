import express, { Request, Response } from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/controller";

const router = express.Router()

router.get("/", getPosts)
router.get("/post/:id", getPostById);
router.post("/", createPost);
router.put("/post/edit/:id", updatePost);
router.delete("/post/delete/:id", deletePost);

export default router