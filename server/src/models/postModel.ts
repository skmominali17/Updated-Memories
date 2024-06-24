import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;