import ServiceProvider from '../models/ServiceProvider.js';

export const createServiceProvider = async (req, res) => {
    console.log(req.file)
    const { name, serviceType, specialty, availableSlots, location, experience } = req.body;
    const avatar=req.file ? req.file.path :null;

    if (!name || !serviceType || !location ){
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }
    try {
        const newServiceProvider = new ServiceProvider({
            name,
            serviceType,
            // specialty,
            availableSlots,
            avatar:avatar,
            location,  
            // experience, 
        });

        await newServiceProvider.save();
        res.status(201).json(newServiceProvider);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service provider', error });
    }
};

export const getServiceProviders = async (req, res) => {
    try {
        const { serviceType, location,avatar } = req.query;
        const query = {};

        if (serviceType) query.serviceType = serviceType;
        if (location) query.location = location;
        if (avatar) query.avatar = avatar;

        const serviceProviders = await ServiceProvider.find(query);
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(510).json({ message: 'Error fetching service providers', error });
    }
};

// Get a specific service provider by ID
export const getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found' });
        }
        res.status(200).json(serviceProvider);
    } catch (error) {
        res.status(501).json({ message: 'Error fetching service provider', error });
    }
};

export const updateServiceProvider = async (req, res) => {
    try {
        const { name, serviceType, specialty, availableSlots, avatar, location, experience } = req.body;

        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found' });
        }

        serviceProvider.name = name || serviceProvider.name;
        serviceProvider.serviceType = serviceType || serviceProvider.serviceType;
        // serviceProvider.specialty = specialty || serviceProvider.specialty;
        serviceProvider.availableSlots = availableSlots || serviceProvider.availableSlots;
        serviceProvider.avatar = avatar || serviceProvider.avatar;
        serviceProvider.location = location || serviceProvider.location;  
        // serviceProvider.experience = experience || serviceProvider.experience; 

        await serviceProvider.save();
        res.status(200).json(serviceProvider);
    } catch (error) {
        res.status(504).json({ message: 'Error updating service provider', error });
    }
};

export const deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found' });
        }

        await serviceProvider.remove();
        res.status(200).json({ message: 'Service provider deleted' });
    } catch (error) {
        res.status(503).json({ message: 'Error deleting service provider', error });
    }
};
