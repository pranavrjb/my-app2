import express from 'express';
import { addDoctor, getDoctors } from '../Controller/doctorController.js';

const router = express.Router();


router.post('/add', addDoctor);  // Route to add a doctor
router.get('/', getDoctors);     // Route to get all doctors

export default router;
