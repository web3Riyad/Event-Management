import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ac-dyizrz2-shard-00-00.khhcdmh.mongodb.net:27017,ac-dyizrz2-shard-00-01.khhcdmh.mongodb.net:27017,ac-dyizrz2-shard-00-02.khhcdmh.mongodb.net:27017/?ssl=true&replicaSet=atlas-ej3urr-shard-0&authSource=admin`;
const client = new MongoClient(uri);
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Database and Collection reference
const db = client.db('EventManagement');
const eventsCollection = db.collection('event');

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas (EventManagement database)!");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToMongoDB();

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Event Management API is running...');
});

// GET all events with optional filters (timeframe=upcoming|past, eventType=Cleanup|Donation|..., limit=6)
app.get('/events', async (req, res) => {
  try {
    const { timeframe, eventType, limit } = req.query;
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    let query = {};

    // Filter by Event Type / Category if specified and not 'All'
    if (eventType && eventType.toLowerCase() !== 'all') {
      query.eventType = { $regex: new RegExp(`^${eventType}$`, 'i') };
    }

    // Filter by upcoming (>= today) or past (< today)
    let sortOrder = 1; // default ascending
    if (timeframe === 'upcoming') {
      query.eventDate = { $gte: today };
      sortOrder = 1; // Nearest coming date first
    } else if (timeframe === 'past') {
      query.eventDate = { $lt: today };
      sortOrder = -1; // Most recent past event first
    }

    let cursor = eventsCollection.find(query).sort({ eventDate: sortOrder });
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      cursor = cursor.limit(limitNum);
    }

    const events = await cursor.toArray();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: 'Failed to fetch events', details: err.message });
  }
});

// GET upcoming events: Sorted ascending by eventDate (coming date first), previous days never shown
app.get('/events/upcoming', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { eventType, limit } = req.query;
    let query = { eventDate: { $gte: today } };

    if (eventType && eventType.toLowerCase() !== 'all') {
      query.eventType = { $regex: new RegExp(`^${eventType}$`, 'i') };
    }

    let cursor = eventsCollection.find(query).sort({ eventDate: 1 });
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      cursor = cursor.limit(limitNum);
    }

    const events = await cursor.toArray();
    res.json(events);
  } catch (err) {
    console.error("Error fetching upcoming events:", err);
    res.status(500).json({ error: 'Failed to fetch upcoming events', details: err.message });
  }
});

// GET past events: Sorted descending by eventDate (most recent past events first)
app.get('/events/past', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { eventType } = req.query;
    let query = { eventDate: { $lt: today } };

    if (eventType && eventType.toLowerCase() !== 'all') {
      query.eventType = { $regex: new RegExp(`^${eventType}$`, 'i') };
    }

    const events = await eventsCollection.find(query).sort({ eventDate: -1 }).toArray();
    res.json(events);
  } catch (err) {
    console.error("Error fetching past events:", err);
    res.status(500).json({ error: 'Failed to fetch past events', details: err.message });
  }
});

// GET single event by ID
app.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).json({ error: 'Failed to fetch event', details: err.message });
  }
});

// POST create a new event
app.post('/events', async (req, res) => {
  try {
    const {
      eventTitle,
      eventType,
      eventDate,
      location,
      thumbnailImageUrl,
      eventDescription,
    } = req.body;

    if (!eventTitle || !eventType || !eventDate) {
      return res.status(400).json({ error: 'eventTitle, eventType, and eventDate are required' });
    }

    const newEvent = {
      eventTitle,
      eventType,
      eventDate,
      location: location || '',
      thumbnailImageUrl: thumbnailImageUrl || '',
      eventDescription: eventDescription || '',
      createdAt: new Date(),
    };

    const result = await eventsCollection.insertOne(newEvent);
    res.status(201).json({
      message: 'Event created successfully',
      insertedId: result.insertedId,
      event: newEvent,
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: 'Failed to create event', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Event Management Backend running on http://localhost:${port}`);
});
