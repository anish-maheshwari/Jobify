import { Router } from 'express';
const router = Router();


import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controller/userController.js';

import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';




router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions('admin'), getApplicationStats,);
router.patch(
  '/update-user',
  upload.single('avatar'),
  checkForTestUser,
  validateUpdateUserInput,
  updateUser
);



export default router;
