import express from 'express';
import {
  getMedia,
  uploadMedia,
  addMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin); // All media management routes require admin JWT

router.get('/', getMedia);
router.post('/upload', uploadMedia);
router.post('/', addMedia);
router.delete('/:id', deleteMedia);

export default router;
