import mongoose from 'mongoose';

const SocialMediaSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const SocialModel = mongoose.model("socialmedia", SocialMediaSchema);

export default SocialModel;