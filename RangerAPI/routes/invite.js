const express = require('express');
const passport = require('passport');
const controller = require('../controllers/invite');

const router = express.Router();

router.get('/:type?', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/id/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/', passport.authenticate('jwt', { session: false }), controller.delete);

module.exports = router;