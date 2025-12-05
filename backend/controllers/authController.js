const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generer JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, establishment } = req.body;

    console.log('=== DEBUT INSCRIPTION ===');
    console.log('Donnees recues:', JSON.stringify({ name, email, role, establishment }, null, 2));

    // Validation des champs requis
    if (!name || !email || !password) {
      console.log('Erreur: Champs manquants');
      return res.status(400).json({
        success: false,
        message: 'Nom, email et mot de passe requis'
      });
    }

    // Verifier si l'utilisateur existe
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('Erreur: Email deja utilise');
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe deja'
      });
    }
    
    // Hash manuel du password
    console.log('Hashage du password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashe avec succes');
    
    // Preparer les donnees d'establishment
    const establishmentData = establishment || {};
    
    // Creer l'utilisateur
    console.log('Creation de l\'utilisateur...');
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'enseignant',
      establishment: {
        name: establishmentData.name || '',
        type: establishmentData.type || 'college',
        city: establishmentData.city || '',
        region: establishmentData.region || ''
      }
    });
    
    await user.save({ validateBeforeSave: true });
    console.log('Utilisateur cree avec succes:', user.email);
    
    // Generer le token
    const token = generateToken(user._id);
    console.log('Token genere');
    
    // Preparer la reponse
    const responseData = {
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          establishment: user.establishment,
          gamification: user.gamification
        },
        token
      }
    };
    
    console.log('Envoi de la reponse...');
    res.status(201).json(responseData);
    console.log('=== FIN INSCRIPTION REUSSIE ===');
    
  } catch (error) {
    console.error('=== ERREUR INSCRIPTION ===');
    console.error('Type:', error.name);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    
    // Erreur de validation Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: messages
      });
    }

    // Erreur de duplication
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est deja utilise'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur serveur'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('=== DEBUT CONNEXION ===');
    console.log('Email:', email);
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('Utilisateur non trouve');
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Verifier le password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
    
    // Generer le token
    const token = generateToken(user._id);
    
    console.log('Connexion reussie:', user.email);
    
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          establishment: user.establishment,
          gamification: user.gamification
        },
        token
      }
    });
    console.log('=== FIN CONNEXION REUSSIE ===');
  } catch (error) {
    console.error('=== ERREUR CONNEXION ===');
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur serveur'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur getMe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recuperation du profil'
    });
  }
};