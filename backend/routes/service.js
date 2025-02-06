import express from 'express';
import { createServiceProvider, getServiceProviderById, deleteServiceProvider, getServiceProviders, updateServiceProvider } from '../Controller/ServiceController.js';
import adminOrServiceProvider from '../middleware/adminOrServiceProviderContoller.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir=(null, 'public/Images'); 
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true})
        }
        cb(null,dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('avatar'), createServiceProvider);
router.get('/', getServiceProviders);
router.get('/:id', adminOrServiceProvider, getServiceProviderById);
router.put('/:id', adminOrServiceProvider, updateServiceProvider); 
router.delete('/:id', adminOrServiceProvider, deleteServiceProvider);

export default router;
