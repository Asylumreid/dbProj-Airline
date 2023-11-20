import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostReviews from './postReviews';
import NavBar from './navbar';
import Header from './header';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Handle error, such as displaying an error message
    }
  };

  const updateReviews = async () => {
    await fetchReviews();
  };

  return (
    <div className="home">
      <NavBar />
      <Header />
      <PostReviews updateReviews={updateReviews} />

      {/* Display fetched reviews */}
      
      <div className="container my-3">
      <h2 className="h4 text-white bg-info mb-3 p-4 rounded">All Reviews</h2>
      {reviews.map((review, index) => (
        <div key={review._id} className="mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{review.topic}</h5>
              <p className="card-text">{review.comment}</p>
            </div>
            <div className="card-footer">
               <small className="text-muted">By: {}</small> {/* for kumar to fetch user id  */}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};
export default Reviews;
