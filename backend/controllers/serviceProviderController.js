const ServiceProvider = require("../models/ServiceProvider");
const { uploadToCloudinary } = require("../utils/cloudinary");
const { validateEmail } = require("../utils/validators");

// Register a new service provider
const registerServiceProvider = async (req, res) => {
    try {
        const {
            businessName,
            serviceCategory,
            businessType,
            description,
            address,
            phone,
            email,
            website,
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

        // Handle logo upload
        let logoUrl = "";
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file, "service-providers");
            logoUrl = uploadResult.secure_url;
        }

        // Create new service provider
        const serviceProvider = new ServiceProvider({
            businessName,
            serviceCategory,
            businessType,
            description,
            address,
            phone,
            email,
            website,
            logo: logoUrl,
            owner: req.user._id, // Assuming user info is added by auth middleware
        });

        await serviceProvider.save();

        res.status(201).json({
            success: true,
            message: "Service provider registered successfully",
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Service provider registration error:", error);
        res.status(500).json({
            success: false,
            message: "Error registering service provider",
            error: error.message,
        });
    }
};

// Get all service providers
const getAllServiceProviders = async (req, res) => {
    try {
        const { category, status } = req.query;
        const query = {};

        if (category) query.serviceCategory = category;
        if (status) query.status = status;

        const serviceProviders = await ServiceProvider.find(query)
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: serviceProviders.length,
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
        const serviceProvider = await ServiceProvider.findById(req.params.id)
            .populate("owner", "name email");

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
            message: "Service provider status updated successfully",
            data: serviceProvider,
        });
    } catch (error) {
        console.error("Error updating service provider status:", error);
        res.status(500).json({
            success: false,
            message: "Error updating service provider status",
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

        // Handle logo upload if new file is provided
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file, "service-providers");
            req.body.logo = uploadResult.secure_url;
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