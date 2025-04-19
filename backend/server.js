const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Festoria';

let db;
client.connect().then(() => {
  db = client.db(dbName);
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});

// POST route to create an event
app.post('/api/events', async (req, res) => {
  try {
    const newEvent = req.body;
    const result = await db.collection('events').insertOne(newEvent);
    res.status(201).json(result.ops ? result.ops[0] : newEvent); // ops is legacy, may be undefined
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await db.collection('events').find().toArray();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Optional: GET single event by ID
const { ObjectId } = require('mongodb');
app.get('/api/events/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
