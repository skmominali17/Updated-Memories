import { Request, Response, NextFunction } from "express";
import User from "../models/UserModel";
import PostMessage from "../models/postModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
	user?: any;
	post?: any;
}

export const isUserValid = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log("isUserValid middleware called");
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Error in isUserValid middleware:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const isAuthenticated = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header
		if (!token) {
			return res
				.status(401)
				.json({ message: "No token provided, authorization denied" });
		}

		const secret = process.env.JWT_SECRET;
		if (!secret) {
			return res
				.status(500)
				.json({
					message: "JWT_SECRET is not defined in the environment variables",
				});
		}

		const decoded = jwt.verify(token, secret);
		const user = await User.findById((decoded as any).id);

		if (!user) {
			return res
				.status(401)
				.json({ message: "User not found, authorization denied" });
		}

		req.user = user; // Attach the user to the request
		next();
	} catch (error) {
		console.error("Error in isAuthenticated middleware:", error);
		return res
			.status(401)
			.json({ message: "Invalid token, authorization denied" });
	}
};

export const isPostOwner = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id: postId } = req.params;
		const userId = req.user?._id;

		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const post = await PostMessage.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		if (post.userId.toString() !== userId.toString()) {
			return res
				.status(403)
				.json({ message: "You do not have permission to perform this action" });
		}

		req.post = post;
		next();
	} catch (error) {
		console.error("Error in isPostOwner middleware:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
