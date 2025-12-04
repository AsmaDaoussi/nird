const express = require('express');
const router = express.Router();
const {
  getProfile,
  addPoints,
  earnBadge,
  getLeaderboard
} = require('../controllers/gamificationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/profile', getProfile);
router.post('/points', addPoints);
router.post('/badges', earnBadge);
router.get('/leaderboard', getLeaderboard);

module.exports = router;