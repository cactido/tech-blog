const router = require('express').Router();
const { Comment, Post, User } = require('../../models')

router.get('/', (req, res) => {
    Comment.findAll({
        include: [
            {
                model: Post,
                attributes: ['id', 'title'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => { res.status(500).json(err); })
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        if (!data) { 
            res.status(404).json({ message: 'Comment not found' })
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err); })
});

router.get('/user/:id', (req, res) => {
    Comment.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(data => {
        if (!data) { 
            res.status(404).json({ message: 'Comment not found' })
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err); })
});

router.post('/', (req, res) => {
    /* body = {
        text: Lorem blab ran row...,
        post_id: 10,
    } */
    Comment.create({
        text: req.body.text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(data => {
        if (!data) { 
            res.status(404).json({ message: 'Comment not found' })
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err); })
});

router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) { 
            res.status(404).json({ message: 'Comment not found' })
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err); })
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) { 
            res.status(404).json({ message: 'Comment not found' })
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err); })
});

module.exports = router;