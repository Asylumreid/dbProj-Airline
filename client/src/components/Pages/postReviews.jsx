import React, { useState } from 'react';
import axios from 'axios';

const PostReviews = ({ updateReviews }) => {
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/reviews', { topic, comment });
      // Call the updateReviews function to fetch the latest reviews
      updateReviews();
      // Optionally, reset the form fields
      setTopic('');
      setComment('');
    } catch (error) {
      console.error('Error posting review:', error);
      // Handle error, such as displaying an error message
    }
  };
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-12">
          <h2 className="h4 text-white bg-info mb-3 p-4 rounded">Reviews</h2>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                className="form-control"
                id="topic"
                placeholder="Give your review a title."
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Review:</label>
              <textarea
                className="form-control"
                id="comment"
                rows="5"
                placeholder="Write your review here."
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostReviews;
