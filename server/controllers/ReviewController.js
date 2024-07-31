import ReviewModel from "../models/model.js"; // Adjust the import statement to match the new model filename

export const createReview = async (req, res) => {
    const { productName, reviewerName, rating, comment } = req.body;
    try {
        const newReview = await ReviewModel.create({
            productName,
            reviewerName,
            rating,
            comment
        });
        return res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await ReviewModel.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedReview = await ReviewModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReview = await ReviewModel.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
