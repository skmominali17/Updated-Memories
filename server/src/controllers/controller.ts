import { Request, Response } from 'express';
import PostMessage from '../models/postModel';
import mongoose from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post not found"
            });
        }
        const post = await PostMessage.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post not found"
            });
        }
        await PostMessage.findByIdAndDelete(req.params.id);
        const availablePosts = await PostMessage.find();
        res.status(200).json({ "message": "Post deleted successfully", availablePosts });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = new PostMessage({
            creator: req.body.Creator,
            title: req.body.Title,
            message: req.body.Message,
            tags: req.body.Tags,
            image: req.body.Image
        })

        await post.save();
        res.status(201).json({ "message": "Post Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error creating post" });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                "message": "Post Not Found"
            })
        }

        const post = await PostMessage.findByIdAndUpdate(req.params.id, {
            creator: req.body.Creator,
            title: req.body.Title,
            message: req.body.Message,
            tags: req.body.Tags,
            image: req.body.Image
        }, {
            new: true
        })
        res.status(200).json({ "message": "Post Updated Successfully", post });
    } catch (error) {
        
    }
}
