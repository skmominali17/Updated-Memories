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
exports.isPostOwner = exports.isAuthenticated = exports.isUserValid = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUserValid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("isUserValid middleware called");
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in isUserValid middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.isUserValid = isUserValid;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract the token from the Authorization header
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
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = yield UserModel_1.default.findById(decoded.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not found, authorization denied" });
        }
        req.user = user; // Attach the user to the request
        next();
    }
    catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        return res
            .status(401)
            .json({ message: "Invalid token, authorization denied" });
    }
});
exports.isAuthenticated = isAuthenticated;
const isPostOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id: postId } = req.params;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const post = yield postModel_1.default.findById(postId);
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
    }
    catch (error) {
        console.error("Error in isPostOwner middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.isPostOwner = isPostOwner;
