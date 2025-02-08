const { tasks } = require("../models");

exports.createTask = async (req, res) => {
    try {
        if (req.body.due_date) {
            const [day, month, year] = req.body.due_date.split("-");
            req.body.due_date = `${year}-${month}-${day}`; // ✅ Convert format
        }
        const task = await tasks.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const allTasks = await tasks.findAll(); // Fetch all tasks from DB
        const today = new Date().toISOString().split("T")[0]; // Get today's date (yyyy-mm-dd)

        const updatedTasks = allTasks.map(task => {
            let status = "Pending"; // Default status

            if (task.completed_at) {
                status = "Completed"; // Task is completed
            } else if (task.due_date === today) {
                status = "Due Today"; // Task is due today
            } else if (task.due_date < today) {
                status = "Overdue"; // Task is past due
            }

            return {
                ...task.toJSON(),
                status // Add calculated status to response
            };
        });

        res.json(updatedTasks);
    } catch (error) {
        console.error("getTasks error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await tasks.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        if (req.body.due_date) {
            const [day, month, year] = req.body.due_date.split("-");
            req.body.due_date = `${year}-${month}-${day}`; // ✅ Convert format
        }
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        console.error("updateTask error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const task = await tasks.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.update({ status: "Completed", completed_at: new Date() });
        res.json(task);
    } catch (error) {
        console.error("completeTask error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await tasks.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.destroy();
        res.json(task);
    } catch (error) {
        console.error("deleteTask error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.searchTasks = async (req, res) => {
    try {
        const { keyword } = req.query;
        const tasks = await tasks.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${keyword}%` } },
                    { description: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        });
        res.json(tasks);
    } catch (error) {
        console.error("searchTasks error:", error);
        res.status(500).json({ error: error.message });
    }
};