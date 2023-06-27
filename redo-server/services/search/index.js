import express from "express";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";

const router = express.Router();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes

// GET /api/events?search=keyword
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const results = await Event.find(query);
    res.json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    res.json(event);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
