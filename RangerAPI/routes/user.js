const express = require('express');
const controller = require('../controllers/user');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), controller.getUsers)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getUserById)
router.get('/search/:login', passport.authenticate('jwt', {session:false}), controller.getUsersByLogin)
router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.delete)
router.get('/friends/:id', passport.authenticate('jwt', {session:false}), controller.getFriends)
router.get('/allfriends/:id', passport.authenticate('jwt', {session:false}), controller.getAllUserFriendsStatus)
router.post('/friends/:id', passport.authenticate('jwt', {session:false}), controller.addFriend)
router.patch('/friends/:id', passport.authenticate('jwt', {session:false}), controller.updateFriend)
router.delete('/friends/:id', passport.authenticate('jwt', {session:false}), controller.deleteFriend)
router.get('/friends/search/:login', passport.authenticate('jwt', {session:false}), controller.getFriendByLogin)
module.exports = router;