const ServiceProvider = require("../models/ServiceProvider");
const { validateEmail } = require("../utils/validators");

// Register a new service provider
const registerServiceProvider = async (req, res) => {
    try {
        const {
            businessName,
            serviceCategory,
            description,
            address,
            phone,
            email,
        } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Check if email already exists
        const existingProvider = await ServiceProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        // let imagePath = "";
        // if (req.file) {
        //     // Use the file path from multer
        //     imagePath = `/images/${req.file.filename}`;
        // }

        // Create new service provider
        const serviceProvider = new ServiceProvider({
            businessName,
            serviceCategory,
            description,
            address,
            phone,
            email,
            // image: imagePath,
            owner: req.user?._id, // Make owner optional for now
        });

        await serviceProvider.save();

        res.status(201).json({
            success: true,
            message: "Service provider registered successfully",
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Error registering service provider:", error);
        res.status(500).json({
            success: false,
            message: "Failed to register service provider",
            error: error.message,
        });
    }
};

// Get all service providers
const getAllServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json({
            success: true,
            data: serviceProviders,
        });
    } catch (error) {
        console.error("Error fetching service providers:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching service providers",
            error: error.message,
        });
    }
};

// Get service provider by ID
const getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: "Service provider not found",
            });
        }
        res.status(200).json({
            success: true,
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Error fetching service provider:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching service provider",
            error: error.message,
        });
    }
};

// Update service provider status
const updateServiceProviderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const serviceProvider = await ServiceProvider.findById(req.params.id);

        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: "Service provider not found",
            });
        }

        serviceProvider.status = status;
        await serviceProvider.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            success: false,
            message: "Error updating status",
            error: error.message,
        });
    }
};

// Update service provider details
const updateServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);

        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: "Service provider not found",
            });
        }

        // Handle image upload if new file is provided
        if (req.file) {
            // Use the file path from multer
            req.body.image = `/uploads/${req.file.filename}`;
        }

        // Update fields
        Object.keys(req.body).forEach((key) => {
            serviceProvider[key] = req.body[key];
        });

        await serviceProvider.save();

        res.status(200).json({
            success: true,
            message: "Service provider updated successfully",
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Error updating service provider:", error);
        res.status(500).json({
            success: false,
            message: "Error updating service provider",
            error: error.message,
        });
    }
};

// Delete service provider
const deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);

        if (!serviceProvider) {
            return res.status(404).json({
                success: false,
                message: "Service provider not found",
            });
        }

        await serviceProvider.remove();

        res.status(200).json({
            success: true,
            message: "Service provider deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting service provider:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting service provider",
            error: error.message,
        });
    }
};

module.exports = {
    registerServiceProvider,
    getAllServiceProviders,
    getServiceProviderById,
    updateServiceProviderStatus,
    updateServiceProvider,
    deleteServiceProvider,
}; 