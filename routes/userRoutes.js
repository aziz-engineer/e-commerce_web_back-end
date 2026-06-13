const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Profile', user: req.user });
});

module.exports = router;