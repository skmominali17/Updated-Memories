import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    image: String,
    likeCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;