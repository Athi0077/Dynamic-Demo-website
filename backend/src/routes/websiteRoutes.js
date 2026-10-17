import express from 'express';
import {
  getPublicWebsite,
  getAdminWebsite,
  saveDraftWebsite,
  publishWebsite,
} from '../controllers/websiteController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for visitors
router.get('/website', getPublicWebsite);

// Protected routes for Admin Builder
router.get('/admin/website', protectAdmin, getAdminWebsite);
router.put('/admin/website/draft', protectAdmin, saveDraftWebsite);
router.post('/admin/website/publish', protectAdmin, publishWebsite);

export default router;
