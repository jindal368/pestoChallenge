const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const task = req.body;

  const newTask = new Task(task);

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No task with that id");

  const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });

  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No task with that id");

  await Task.findByIdAndRemove(id);

  res.json({ message: "Task deleted successfully" });
};
