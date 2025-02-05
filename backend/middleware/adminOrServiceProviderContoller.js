import { roles } from "../utils/constants.js";
const adminOrServiceProvider = (req, res, next) => {
    if (req.user && req.user.role === roles.admin || req.user && req.user.role === roles.serviceProvider) {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied' });
};

export default adminOrServiceProvider;
