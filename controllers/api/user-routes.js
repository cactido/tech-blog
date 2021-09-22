const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] };
    })
    .then(data => res.json(data))
    .catch(err => { res.status(500).json(err); })
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] }
    })
    .then(data => {
        if (!data) { 
            req.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(data);
    })
    .catch(err => { res.status(500).json(err); })
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        req.session.save(() =>  {
            req.session.user_id = data.id;
            req.session.loggedIn = true;
            res.json(data);
        });
    })
    .catch(err => { res.status(500).json(err); })
})

router.post('/signup', (req, res) => {
    User.findOne({
        where: { username: req.body.username },
        attributes: { exclude: ['password'] }
    })
    .then(data => {
        if (data) {
            res.status(409).json({ message: 'This username is already taken.' });
            return;
        }
        User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(data => {
            req.session.save(() => {
                req.session.user_id = data.id;
                req.session.username = data.username;
                req.session.loggedIn = true;
                res.redirect('/');
                return;
            })
        })
        .catch(err => { res.status(500).json(err) })
    })
    .catch(err => { res.status(500).json(err) })
})