const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>" yapısında beklenir

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Doğrulanan kullanıcı bilgilerini isteğe ekle
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = verifyToken;
