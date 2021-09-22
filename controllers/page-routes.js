const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
    //redirect to home if user is logged in
    if (req.session.loggedIn) { 
        res.redirect('/home');
        return;
    }
    //if not, render the landing page
    res.render('landing', { loggedIn: req.session.loggedIn });
})

router.get('/home', (req, res) => {
    //redirect if not logged in
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //retrieve all posts and render them on the home view
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => { res.status(500).json(err) });
});

router.get('/dashboard', (req, res) => {
    //redirect if not logged in
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //retrieve all posts and render the dashboard
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => { res.status(500).json(err) });
})

module.exports = router;