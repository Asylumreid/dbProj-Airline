
import express from "express";
import Review from "./reviewmodel.js";

const router = express.Router();

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new review
router.post('/', async (req, res) => {
  const { topic, comment } = req.body;

  try {
    const newReview = new Review({ topic, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;