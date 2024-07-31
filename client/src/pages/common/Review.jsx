// Review.js
import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Review() {
  const [review, setReview] = useState({
    productName: "",
    reviewerName: "",
    rating: 0,
    comment: ""
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Access state values
  const total = location.state;

  const createReview = async () => {
    try {
      const response = await authAxios.post(`${apiUrl}/reviews`, review);
      if (response.status === 201) {
        toast.success('Review has been submitted successfully.');
        navigate('/'); // Redirect to homepage or another appropriate route
      } else {
        toast.error('Failed to submit the review.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the review.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Review Management</h1>
      <form onSubmit={createReview}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold">Product Name</label>
          <input type="text" id="productName" name="productName" value={review.productName} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="reviewerName" className="block text-gray-700 font-bold">Your Name</label>
          <input type="text" id="reviewerName" name="reviewerName" value={review.reviewerName} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold">Rating</label>
          <input type="number" id="rating" name="rating" value={review.rating} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-bold">Comment</label>
          <textarea id="comment" name="comment" value={review.comment} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded w-full h-40"></textarea>
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
