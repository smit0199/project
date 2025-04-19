const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Festoria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Event model
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  image: String
});

const Event = mongoose.model('Event', eventSchema);

// POST route to create an event
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
