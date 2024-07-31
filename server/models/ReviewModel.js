import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    reviewerName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ReviewModel = mongoose.model("review", ReviewSchema);


export default ReviewModel;
