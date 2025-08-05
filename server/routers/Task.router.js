const express = require('express');
const { getTask, createTask, updateTask, deleteTask } = require('../controllers/Task.controller');

const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);
router.get('/',getTask);
router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;