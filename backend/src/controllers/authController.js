import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_nova_2026_modern_cms_builder_secure',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

/**
 * @desc    Admin Login & return JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (error) {
    console.error('[Auth Controller] Login error:', error);
    return res.status(500).json({ error: 'Server error during authentication.' });
  }
};

/**
 * @desc    Get current authenticated admin info
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getAdminProfile = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    return res.status(200).json({
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        avatar: req.admin.avatar,
      },
    });
  } catch (error) {
    console.error('[Auth Controller] Profile error:', error);
    return res.status(500).json({ error: 'Server error fetching profile.' });
  }
};
