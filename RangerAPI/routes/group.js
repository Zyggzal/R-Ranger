const express = require('express');
const controller = require('../controllers/group');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/public', passport.authenticate('jwt', { session: false }), controller.getPublic);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.get('/userid/:id', passport.authenticate('jwt', { session: false }), controller.getAllByUserId);
router.get('/search/:name', passport.authenticate('jwt', { session: false }), controller.getGroupsByName);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.get('/:id/members', passport.authenticate('jwt', { session: false }), controller.getMembers);
router.post('/:id/members', passport.authenticate('jwt', { session: false }), controller.addMember);
router.patch('/:id/members', passport.authenticate('jwt', { session: false }), controller.editMember);
router.delete('/:id/members', passport.authenticate('jwt', { session: false }), controller.deleteMember);
router.get('/:groupId/memberStatus/:userId', passport.authenticate('jwt', { session: false }), controller.userStatus);

module.exports = router;