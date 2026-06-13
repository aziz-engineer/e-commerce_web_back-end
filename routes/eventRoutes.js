const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEvent);

// Admin routes
router.post('/', authMiddleware, roleMiddleware('admin'), createEvent);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateEvent);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteEvent);

module.exports = router;