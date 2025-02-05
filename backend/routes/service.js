import express from 'express';
import { createServiceProvider, getServiceProviderById,deleteServiceProvider,getServiceProviders,updateServiceProvider } from '../Controller/ServiceController.js';
import adminOrServiceProvider from '../middleware/adminOrServiceProviderContoller.js';

const router = express.Router();


router.post('/add', createServiceProvider);  
router.get('/', getServiceProviders);     
router.get('/:id',adminOrServiceProvider, getServiceProviderById);     
router.get('/:id',adminOrServiceProvider, updateServiceProvider);     
router.delete('/:id',adminOrServiceProvider, deleteServiceProvider);    

export default router;
