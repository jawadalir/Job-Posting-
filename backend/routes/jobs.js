const express = require('express');
const {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes
router.post('/', protect, createJob);
router.get('/user/my-jobs', protect, getMyJobs);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
