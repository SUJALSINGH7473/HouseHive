import express from 'express';
import { deleteUser, getUserListings, test, updateUser, getUser, storeToken } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);
router.put('/store-token/:id', verifyToken, storeToken);
export default router;
