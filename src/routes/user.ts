import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/register',authController.registerNewUser);
router.post('/login',authController.loginUser);


export default router;