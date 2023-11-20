import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostReviews from './postReviews';
import NavBar from './navbar';
import Header from './header';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle error, such as displaying an error message
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="home">
      <NavBar />
      <Header />
      <PostReviews />

      {/* Display fetched reviews */}
      <div className="container my-3">
        <h2 className="h4 text-white bg-info mb-3 p-4 rounded">All Reviews</h2>
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review._id} className="list-group-item">
              <strong>{review.topic}</strong>: {review.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
