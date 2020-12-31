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
    const newPost = new postMessage(req.body);
    try {
        await newPost.save();

        res.status(202).json(newPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};