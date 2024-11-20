const express = require('express');
const passport = require('passport');
const controller = require('../controllers/event');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.get('/search/:name', passport.authenticate('jwt', { session: false }), controller.getEventsByName);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.get('/:id/participants', passport.authenticate('jwt', { session: false }), controller.getParticipants);
router.patch('/:id/participants', passport.authenticate('jwt', { session: false }), controller.updateParticipant);
router.post('/:id/participants', passport.authenticate('jwt', { session: false }), controller.addParticipant);
router.delete('/:id/participants', passport.authenticate('jwt', { session: false }), controller.removeParticipant);

module.exports = router;