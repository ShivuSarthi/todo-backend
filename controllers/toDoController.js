const Task = require("../models/ToDO");

exports.getToDo = async (req, res) => {
  try {
    const tasks = await Task.find({ user: { $in: req.user.id } });
    res.status(200).json({
      message: "Available task",
      tasks: tasks || []
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  }
};

exports.addToDo = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      dueDate
    });
    const task = await newTask.save();
    res.status(200).json({
      message: "Task added successfully",
      task: task
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  }
};

exports.updateToDo = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    task = await task.save();
    res.status(200).json({
      message: "Task updated successfully",
      task: task
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    });
  }
};
