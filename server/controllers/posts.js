import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPost = async (req,res) => {
    try {
        const postMessages = await postMessage.find();

        res.status(201).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        await newPost.save();

        res.status(202).json(newPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

    const updatedpost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, { new : true});

    res.json(updatedpost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Cannot find post with that ID');

    await postMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}