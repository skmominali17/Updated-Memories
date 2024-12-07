import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [String],
    image: String,
    likeCount: [{
        type: Number,
        default: 0
    }]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;