const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
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

router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
    .then(data => {
        console.log(data);
        if (!data) { 
            res.status(400).json({ message: 'User not found.' }); 
            return;
        }
        //validate password with the checkPassword function of the User object
        const validate = data.checkPassword(req.body.password);
        //fail login if password is incorrect
        if (!validate) { 
            res.status(400).json({ message: 'Invalid password.' });
            return;
        }
        //update session and return to root if password is valid
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
            res.redirect('/');
            return;
        });
    })
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');
            return;
        })
    }
});

router.put('/:id', (req, res) => {
    //check session variables for logged-in state and redirects to root if not
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    User.update({
        where: { id: req.params.id }
    })
    .then(data => {
        if (!data) { 
            res.status(400).json({ message: 'User not found.' }); 
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err) })
})

router.delete('/:id', (req, res) => {
    //check session variables for logged-in state and redirects to root if not
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    User.destroy({
        where: { id: req.params.id }
    })
    .then(data => {
        if (!data) { 
            res.status(400).json({ message: 'User not found.' }); 
            return;
        }
        res.json(data);
    })
    .catch(err => { res.status(500).json(err) })
})

module.exports = router;