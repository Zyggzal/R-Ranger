const express = require('express');
const passport = require('passport');
const controller = require('../controllers/event');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.post('/:id/inviteUser', passport.authenticate('jwt', { session: false }), controller.inviteUser);
router.delete('/:id/removeUser', passport.authenticate('jwt', { session: false }), controller.removeUser);

module.exports = router;