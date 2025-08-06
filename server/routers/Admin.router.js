const express = require('express');
const { authMiddleware, requireAdmin } = require('../middlewares/auth.middleware');
const { getAllUsers, getUserTasks, deleteUser } = require('../controllers/Admin.controller');

const router = express.Router();

router.use(authMiddleware); // ✅ Auth required
router.use(requireAdmin);    // ✅ Admin only

// Example admin route
router.get('/users',getAllUsers);
router.get('/users/:userId/tasks',getUserTasks);
router.delete('/users/:userId',deleteUser);

module.exports = router;
