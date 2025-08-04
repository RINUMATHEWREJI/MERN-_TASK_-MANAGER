const express = require('express');
const { getTask, createTask, updateTask, deleteTask } = require('../controllers/Task.controller');

const router = express.Router();

router.get('/',getTask);
router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;