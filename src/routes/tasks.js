const express = require('express');
const { validateRequest, taskSchema } = require('../middlewares/validateRequest');
const { createTask, getTasks, updateTask, completeTask, searchTasks, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', validateRequest(taskSchema), createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', validateRequest(taskSchema), updateTask);
router.put('/tasks/:id/complete', completeTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/search', searchTasks);

module.exports = router;