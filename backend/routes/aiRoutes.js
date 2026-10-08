import express from 'express';
import { recommendDoctor, analyzeSkinHealth } from '../controllers/aiController.js';

const router = express.Router();

router.post('/doctor-recommendation', recommendDoctor);
router.post('/skin-analysis', analyzeSkinHealth);

export default router;

