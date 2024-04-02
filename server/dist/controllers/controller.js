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
exports.updatePost = exports.createPost = exports.deletePost = exports.getPostById = exports.getPosts = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const mongoose_1 = __importDefault(require("mongoose"));
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
            creator: req.body.Creator,
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
            creator: req.body.Creator,
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
