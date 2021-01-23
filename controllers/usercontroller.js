const router = require('express').Router();
const User = require('../db').import('../models/user');

module.exports = router;

/* *********************
******* USER SIGNUP ********
************************* */
router.post('/create', function (req, res) {

    User.create({
        username: req.body.user.username,
        passwordhash: req.body.user.passwordhash
    })
    .then(
        res.send("This is our user/create endpoint!")
    );
});

module.exports = router;

