import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updatePreference } from '../controllers/preference.controller.js';

const router = express.Router();
router.put('/update/:id', verifyToken, updatePreference);
export default router;