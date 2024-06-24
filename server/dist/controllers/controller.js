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
exports.updatePost = exports.createPost = exports.deletePost = exports.getPostById = exports.getPosts = exports.login = exports.register = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking inputs from the body
        const { name, email, password } = req.body;
        // hashing the password with bcryptjs
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // if user already exists in DB then return
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // if user dosent exists then create a user in DB
        const user = yield UserModel_1.default.create({ name, email, password: hashedPassword });
        yield user.save();
        // Generate token with JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, "shhh", { expiresIn: '1h' });
        // set the token in authorization header
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // taking inputs from body
    const { email, password } = req.body;
    // if email does not exists in DB then return
    const user = yield UserModel_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
    // if email exists then verify the password with the hashed password
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // Generate Token
    const token = jsonwebtoken_1.default.sign({ id: user._id }, "shhh", { expiresIn: "1h" });
    // set the authorization header
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: "Login Succesfully" });
});
exports.login = login;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post not found"
            });
        }
        const post = yield postModel_1.default.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post not found"
            });
        }
        yield postModel_1.default.findByIdAndDelete(req.params.id);
        const availablePosts = yield postModel_1.default.find();
        res.status(200).json({ "message": "Post deleted successfully", availablePosts });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletePost = deletePost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new postModel_1.default({
            title: req.body.Title,
            message: req.body.Message,
            tags: req.body.Tags,
            image: req.body.Image
        });
        yield post.save();
        res.status(201).json({ "message": "Post Created Successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error creating post" });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post Not Found"
            });
        }
        const post = yield postModel_1.default.findByIdAndUpdate(req.params.id, {
            title: req.body.Title,
            message: req.body.Message,
            tags: req.body.Tags,
            image: req.body.Image
        }, {
            new: true
        });
        res.status(200).json({ "message": "Post Updated Successfully", post });
    }
    catch (error) {
    }
});
exports.updatePost = updatePost;
