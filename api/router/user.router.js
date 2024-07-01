import {Router} from 'express';
import { test } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken} from '../utils/verifyToken.js';
import { deleteUser,getUserListings,getUser } from '../controllers/user.controller.js';
const router=Router();

router.get('/test',test);
router.post('/update/:id',verifyToken ,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser);

export default router;