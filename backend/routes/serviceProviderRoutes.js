const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    protect,
    isAdmin,
    isServiceProvider,
    isAdminOrServiceProvider
} = require("../middleware/auth");
const {
    registerServiceProvider,
    getAllServiceProviders,
    getServiceProviderById,
    updateServiceProviderStatus,
    updateServiceProvider,
    deleteServiceProvider,
} = require("../controllers/serviceProviderController");

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Not an image! Please upload an image."), false);
        }
    },
});

// Public routes
router.get("/", getAllServiceProviders);
router.get("/:id", getServiceProviderById);

// Protected routes
router.use(protect);

// Service provider registration (accessible by authenticated users)
router.post(
    "/register",
    upload.single("logo"),
    registerServiceProvider
);

// Service provider routes (accessible by the service provider or admin)
router.put(
    "/:id",
    isAdminOrServiceProvider,
    upload.single("logo"),
    updateServiceProvider
);

router.delete(
    "/:id",
    isAdminOrServiceProvider,
    deleteServiceProvider
);

// Admin only routes
router.patch(
    "/:id/status",
    isAdmin,
    updateServiceProviderStatus
);

module.exports = router; 