
import axios from 'axios';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const PostReviews = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInAdmin = localStorage.getItem("admin");
    const storedMessage = localStorage.getItem('toastMessage');



    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser[0]);
    } else if (loggedInAdmin) {
      const foundAdmin = JSON.parse(loggedInAdmin);
      setAdmin(foundAdmin[0]);
    }
   

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/user/`+ parseInt(user.user_id));
        setData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    if (storedMessage) {
      // Show the stored message as a toast
      toast.info(storedMessage);

      // Clear the stored message
      localStorage.removeItem('toastMessage');
    }
   
  }, [user.user_id]);


  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      // Make a POST request to your backend API
      if (user.user_id == null) {
        localStorage.setItem('toastMessage', 'You have to log in first');
        window.location.reload();
       // navigate("/login");
      } else {
        const first_name = data.first_name;
        
        await axios.post('http://localhost:4000/reviews', {topic,comment,first_name});
       
      
        localStorage.setItem('toastMessage', 'You have posted a review');
        window.location.reload();
        toast.info("You has post a review");
      // return handleReview(true);
       
      }
      
    // Optionally, reset the form fields
    setTopic('');
    setComment('');
      

      // Handle any additional logic, such as displaying a success message
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

         
       {data ? (
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
            <button type="submit" className="btn btn-primary" >
              Post
            </button>
          </form>
        ) : (<p>Login to post a review</p>
          )}
          <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Flip}
        />
        </div>
      </div>
    </div>
    
  );
};

export default PostReviews;
