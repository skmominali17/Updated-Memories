"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: String,
    message: String,
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    tags: [String],
    image: String,
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const PostMessage = mongoose_1.default.model('PostMessage', postSchema);
exports.default = PostMessage;