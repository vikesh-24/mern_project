import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },


}, { timestamps: true });

const NewsModel = mongoose.model("news", NewsSchema);

export default NewsModel;