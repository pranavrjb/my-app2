import {roles} from '../utils/constants.js'
const admin = (req, res, next) => {
    if (req.user && req.user.role === roles.admin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

export default admin;
