const express = require('express');
const controller = require('../controllers/user');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), controller.getUsers)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getUserById)
router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.delete)

module.exports = router;