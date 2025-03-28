const cloudinary = require("cloudinary").v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
const uploadToCloudinary = async (file, folder = "service-providers") => {
    try {
        if (!file) return null;

        // Upload the file
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folder,
            resource_type: "auto",
        });

        // Return the secure URL
        return {
            secure_url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Error uploading file to cloud storage");
    }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return null;

        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("Error deleting file from cloud storage");
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
}; 