const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

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

// User signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    await db.collection('users').insertOne({ username, email, password });
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//SMS sender 

const accountSid = 'AC5c18c4e871915c1b1f9d52400fa023ea';       // from Twilio dashboard
const authToken = '0f2af26e3e50c0821bcc110234e3c6ea';         // from Twilio dashboard
const clientTwilio = twilio(accountSid, authToken);

app.post('/api/send-sms', async (req, res) => {

  const { phone, eventTitle, eventDate } = req.body;
  console.log('Received SMS request:', phone, eventTitle, eventDate); // Add logging here

  try {
    const message = await clientTwilio.messages.create({
      body: `<br>You're confirmed for participating in ${eventTitle} Event on ${new Date(eventDate).toLocaleString()}`,
      from: '+1(551)350-2847',  // Your Twilio phone number
      to: phone                 // User's phone number (with country code)
    });

    console.log('SMS sent successfully:', message); // Log success message
    res.status(200).json({ message: 'SMS sent' });
  } catch (err) {
    console.error('SMS failed:', err);  // Log detailed error
    res.status(500).json({ message: 'SMS sending failed', error: err.message });
  }
});