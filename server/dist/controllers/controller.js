"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.updatePost = exports.createPost = exports.deletePost = exports.getPostById = exports.getPosts = exports.login = exports.register = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postModel_1 = __importDefault(require("../models/postModel"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Check if user already exists
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create the user
        const user = yield UserModel_1.default.create({ name, email, password: hashedPassword });
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Set token in authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        // Send response
        res
            .status(201)
            .json({ message: "User registered successfully", userId: user._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // Validate password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Set token in authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        // Return success and token in the response
        res
            .status(200)
            .json({ message: "Login successful", token, userId: user._id, user: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});
exports.login = login;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find();
        // console.log(req.user);
        res.status(200).json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({ message: "Post not found" });
        }
        const post = yield postModel_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching post" });
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({ message: "Post not found" });
        }
        const post = yield postModel_1.default.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const availablePosts = yield postModel_1.default.find();
        res
            .status(200)
            .json({ message: "Post deleted successfully", availablePosts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting post" });
    }
});
exports.deletePost = deletePost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, please login" });
        }
        const { title, message, tags, image } = req.body;
        const post = new postModel_1.default({
            title,
            message,
            tags,
            image,
            userId: req.user._id,
        });
        yield post.save();
        res.status(200).json({ message: "Post created successfully", post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({ message: "Post not found" });
        }
        const updatedPost = yield postModel_1.default.findByIdAndUpdate(postId, {
            title: req.body.title,
            message: req.body.message,
            tags: req.body.tags,
            image: req.body.image,
        }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post updated successfully", updatedPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating post" });
    }
});
exports.updatePost = updatePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params;
    const Updatedpost = yield postModel_1.default.findByIdAndUpdate(postId.id, { $inc: { likeCount: 1 } }, { new: true });
    res.json(Updatedpost);
    console.log(Updatedpost);
    console.log(postId.id);
    console.log("HI!");
    //   res.json({ message: "POST LIKED!" });
});
exports.likePost = likePost;
