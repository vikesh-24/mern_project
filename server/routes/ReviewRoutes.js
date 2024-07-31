import express from 'express';
import { createReview, getAllReviews, deleteReview, updateReview, getReviewById } from '../controllers/ReviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/', createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;
