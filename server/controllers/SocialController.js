import SocialModel from "../models/SocialModel.js";

export const createSocialMedia = async (req, res) => {
    const { platform, url } = req.body;
    try {
        const newSocialMedia = await SocialModel.create({
            platform,
            url
        });
        return res.status(201).json(newSocialMedia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllSocialMedia = async (req, res) => {
    try {
        const socialMedia = await SocialModel.find();
        res.status(200).json(socialMedia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSocialMediaById = async (req, res) => {
    try {
        const id = req.params.id;
        const socialMedia = await SocialModel.findById(id);
        if (!socialMedia) {
            return res.status(404).json({ message: "Social media not found" });
        }
        res.status(200).json(socialMedia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateSocialMedia = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedSocialMedia = await SocialModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedSocialMedia) {
            return res.status(404).json({ message: "Social media not found" });
        }
        res.status(200).json({ message: "Social media updated successfully", socialMedia: updatedSocialMedia });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSocialMedia = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedSocialMedia = await SocialModel.findByIdAndDelete(id);
        if (!deletedSocialMedia) {
            return res.status(404).json({ message: "Social media not found" });
        }
        res.status(200).json({ message: "Social media deleted successfully", socialMedia: deletedSocialMedia });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
