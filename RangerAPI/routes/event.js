const express = require('express');
const passport = require('passport');
const controller = require('../controllers/event');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/public', passport.authenticate('jwt', { session: false }), controller.getPublic);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.get('/search/:name', passport.authenticate('jwt', { session: false }), controller.getEventsByName);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.get('/:id/participants', passport.authenticate('jwt', { session: false }), controller.getParticipants);
router.patch('/:id/participants', passport.authenticate('jwt', { session: false }), controller.updateParticipant);
router.post('/:id/participants', passport.authenticate('jwt', { session: false }), controller.addParticipantToEvent);
router.delete('/:id/participants', passport.authenticate('jwt', { session: false }), controller.removeParticipant);
router.get('/:eventId/participantStatus/:userId', passport.authenticate('jwt', { session: false }), controller.getUserStatus);

module.exports = router;