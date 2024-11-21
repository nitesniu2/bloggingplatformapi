const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// Create a blog post
router.post('/', (req, res) => {
    const {title, content, category, tags} = req.body;
    if (!title || !content) return res.status(400).json({error: 'Title and content are required.'});
    // Ensure 'tags' is an array
    if (!Array.isArray(tags)) {
        return res.status(400).json({ error: "'tags' must be an array" });
    }
    Post.create({title, content, category, tags}, (err, post) => {
        if (err) return res.status(500).json({error: err.message});
        res.status(201).json(post);
    });
});

// Update a blog post
router.put('/:id', (req, res) => {
    const {title, content, category, tags} = req.body;
    Post.update(req.params.id, {title, content, category, tags}, (err, post) => {
        if (err) return res.status(500).json({error: err.message});
        if (!post) return res.status(404).json({error: 'Post not found.'});
        res.status(200).json(post);
    });
});

// Delete a blog post
router.delete('/:id', (req, res) => {
    Post.delete(req.params.id, (err, success) => {
        if (err) return res.status(500).json({error: err.message});
        if (!success) return res.status(404).json({error: 'Post not found.'});
        res.status(204).send();
    });
});

// Get a single blog post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return res.status(500).json({error: err.message});
        if (!post) return res.status(404).json({error: 'Post not found.'});
        res.status(200).json(post);
    });
});

// Get all blog posts
router.get('/', (req, res) => {
    const term = req.query.term;
    const callback = (err, posts) => {
        if (err) return res.status(500).json({error: err.message});
        res.status(200).json(posts);
    };

    if (term) {
        Post.search(term, callback);
    } else {
        Post.findAll(callback);
    }
});

module.exports = router;
