import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
