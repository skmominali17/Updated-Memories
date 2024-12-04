import express, { Request, Response } from "express";
import {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	login,
	register,
	updatePost,
} from "../controllers/controller";
import {
	isAuthenticated,
	isPostOwner,
	isUserValid,
} from "../middlewares/middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", isUserValid, login);
router.get("/get/all-posts", getPosts);
router.get("/get/post/:id", getPostById);
router.post("/create/post", isAuthenticated, createPost);
router.put("/update/post/:id", isAuthenticated, isPostOwner, updatePost);
router.delete("/delete/post/:id", isAuthenticated, isPostOwner, deletePost);

export default router;
