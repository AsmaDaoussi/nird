const User = require('../models/User');

// Liste des badges disponibles
const BADGES = {
  eclaireur: {
    name: 'Éclaireur',
    icon: '🔍',
    description: 'Diagnostic complété',
    points: 50
  },
  curieux: {
    name: 'Curieux',
    icon: '📚',
    description: '3 solutions consultées',
    points: 30
  },
  ambassadeur: {
    name: 'Ambassadeur',
    icon: '👨‍🏫',
    description: 'Présentation NIRD à l\'équipe',
    points: 40
  },
  pilote: {
    name: 'Pilote',
    icon: '🧪',
    description: 'Installation Linux sur PC pilote',
    points: 50
  },
  formateur: {
    name: 'Formateur',
    icon: '🎓',
    description: 'Formation de collègues',
    points: 60
  },
  econome: {
    name: 'Économe',
    icon: '💰',
    description: '1000€ économisés',
    points: 70
  },
  pingouin: {
    name: 'Pingouin d\'Or',
    icon: '🐧',
    description: 'Migration Linux complète',
    points: 100
  },
  ecochampion: {
    name: 'Éco-Champion',
    icon: '♻️',
    description: 'Reconditionnement de matériel',
    points: 80
  }
};

// Fonction pour calculer le niveau
const calculateLevel = (points) => {
  if (points >= 600) return 'champion';
  if (points >= 300) return 'gardien';
  if (points >= 100) return 'guerrier';
  return 'apprenti';
};

// @desc    Get user profile with gamification
// @route   GET /api/gamification/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const profile = {
      user: {
        name: user.name,
        establishment: user.establishment,
        role: user.role
      },
      gamification: {
        level: user.gamification.level,
        points: user.gamification.points,
        badges: user.gamification.badges,
        nextLevel: getNextLevelInfo(user.gamification.points)
      }
    };
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
};

// @desc    Add points to user
// @route   POST /api/gamification/points
// @access  Private
exports.addPoints = async (req, res) => {
  try {
    const { points, action } = req.body;
    
    const user = await User.findById(req.user.id);
    
    const newPoints = user.gamification.points + points;
    const newLevel = calculateLevel(newPoints);
    
    user.gamification.points = newPoints;
    user.gamification.level = newLevel;
    
    await user.save();
    
    res.json({
      success: true,
      data: {
        points: user.gamification.points,
        level: user.gamification.level,
        action
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout de points'
    });
  }
};

// @desc    Earn badge
// @route   POST /api/gamification/badges
// @access  Private
exports.earnBadge = async (req, res) => {
  try {
    const { badgeKey } = req.body;
    
    const badge = BADGES[badgeKey];
    if (!badge) {
      return res.status(400).json({
        success: false,
        message: 'Badge invalide'
      });
    }
    
    const user = await User.findById(req.user.id);
    
    // Vérifier si le badge est déjà obtenu
    const hasBadge = user.gamification.badges.some(b => b.name === badge.name);
    
    if (hasBadge) {
      return res.status(400).json({
        success: false,
        message: 'Badge déjà obtenu'
      });
    }
    
    // Ajouter le badge
    user.gamification.badges.push({
      name: badge.name,
      icon: badge.icon,
      earnedAt: Date.now()
    });
    
    // Ajouter les points
    user.gamification.points += badge.points;
    user.gamification.level = calculateLevel(user.gamification.points);
    
    await user.save();
    
    res.json({
      success: true,
      data: {
        badge,
        totalPoints: user.gamification.points,
        level: user.gamification.level
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'obtention du badge'
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/gamification/leaderboard
// @access  Private
exports.getLeaderboard = async (req, res) => {
  try {
    const { type = 'points', limit = 10 } = req.query;
    
    let sortField = 'gamification.points';
    
    const users = await User.find()
      .select('name establishment gamification')
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));
    
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      establishment: user.establishment?.name,
      points: user.gamification.points,
      level: user.gamification.level,
      badgesCount: user.gamification.badges.length
    }));
    
    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du classement'
    });
  }
};

// Helper function
function getNextLevelInfo(currentPoints) {
  const levels = [
    { name: 'apprenti', threshold: 0 },
    { name: 'guerrier', threshold: 100 },
    { name: 'gardien', threshold: 300 },
    { name: 'champion', threshold: 600 }
  ];
  
  for (let i = 0; i < levels.length; i++) {
    if (currentPoints < levels[i].threshold) {
      return {
        name: levels[i].name,
        pointsNeeded: levels[i].threshold - currentPoints,
        threshold: levels[i].threshold
      };
    }
  }
  
  return null; // Niveau max atteint
}