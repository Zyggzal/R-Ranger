const express = require('express');
const controller = require('../controllers/group');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.post('/:id/users', passport.authenticate('jwt', { session: false }), controller.addUser);
router.delete('/:id/users', passport.authenticate('jwt', { session: false }), controller.deleteUser);

module.exports = router;