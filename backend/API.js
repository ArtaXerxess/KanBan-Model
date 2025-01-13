const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/kanban', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB:', err));


const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Testing', 'Done'], default: 'To Do' },
  isNew: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

// API routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


app.post('/api/tasks', async (req, res) => {
  const { name, description } = req.body;
  const task = new Task({ name, description });
  
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
  }
});


app.put('/api/tasks/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});


app.put('/api/tasks/details/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { name, description, isNew: false }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task details' });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
