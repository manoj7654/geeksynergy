const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization ;
    try {
        if (token) {
            const decode = jwt.verify(token, process.env.key); 
            if (decode) {
        
                return next();
            } else {
                return res.status(401).json({ message: "Please login again" });
            }
        } else {
            return res.status(401).json({ message: "Please login first" });
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ error: error.message });
        }
        console.error('Headers were already sent', error);
    }
};

module.exports = { authenticate };