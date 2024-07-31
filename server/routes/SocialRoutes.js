import express from 'express';
import { createSocialMedia, getAllSocialMedia, deleteSocialMedia, updateSocialMedia, getSocialMediaById } from '../controllers/SocialController.js';

const socialRouter = express.Router();

socialRouter.post('/', createSocialMedia);
socialRouter.get('/', getAllSocialMedia);
socialRouter.get('/:id', getSocialMediaById);
socialRouter.put('/:id', updateSocialMedia);
socialRouter.delete('/:id', deleteSocialMedia);

export default socialRouter;
