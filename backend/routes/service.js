import express from 'express';
import { createServiceProvider, getServiceProviderById, deleteServiceProvider, getServiceProviders, updateServiceProvider } from '../Controller/ServiceController.js';
import adminOrServiceProvider from '../middleware/adminOrServiceProviderContoller.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir=(null, './images'); 
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true})
        }
        cb(null,dir);
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    }
});

const isImage =(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error("Only Image is valid!"))
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter:isImage 
});

router.post('/add', upload.single('avatar'), createServiceProvider);
router.get('/', getServiceProviders);
router.get('/:id', adminOrServiceProvider, getServiceProviderById);
router.put('/:id', adminOrServiceProvider, updateServiceProvider); 
router.delete('/:id', adminOrServiceProvider, deleteServiceProvider);

export default router;
