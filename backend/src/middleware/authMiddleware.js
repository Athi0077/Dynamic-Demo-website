import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'super_secret_jwt_key_nova_2026_modern_cms_builder_secure'
      );

      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({ error: 'Not authorized: Admin user no longer exists.' });
      }

      req.admin = admin;
      return next();
    } catch (error) {
      console.error('[Auth Middleware] Invalid token:', error.message);
      return res.status(401).json({ error: 'Not authorized: Invalid or expired token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized: No authentication token provided.' });
  }
};
