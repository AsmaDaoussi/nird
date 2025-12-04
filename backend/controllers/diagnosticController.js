const Diagnostic = require('../models/Diagnostic');
const User = require('../models/User');

// Fonction de calcul du score de dépendance
const calculateDependencyScore = (answers) => {
  let score = 0;
  
  // OS propriétaire = +30 points
  if (answers.currentOS === 'windows10' || answers.currentOS === 'windows11') {
    score += 30;
  }
  
  // Budget licences élevé = +25 points
  if (answers.budgetLicenses > 5000) {
    score += 25;
  } else if (answers.budgetLicenses > 2000) {
    score += 15;
  }
  
  // Pas de personnel IT = +20 points
  if (!answers.hasITStaff) {
    score += 20;
  }
  
  // Nombre d'ordinateurs élevé = +15 points
  if (answers.computerCount > 100) {
    score += 15;
  } else if (answers.computerCount > 50) {
    score += 10;
  }
  
  // Préoccupations = +10 points
  score += Math.min(answers.mainConcerns?.length * 5 || 0, 10);
  
  return Math.min(score, 100);
};

// Fonction de calcul des économies potentielles
const calculateSavings = (answers) => {
  const computerCount = answers.computerCount;
  const currentBudget = answers.budgetLicenses || 0;
  
  // Économies sur 3 ans
  const licenseSavings = (145 * computerCount) * 3; // Windows 11 license
  const maintenanceSavings = computerCount * 50 * 3; // Maintenance
  const totalMoneySavings = licenseSavings + maintenanceSavings;
  
  // CO2 (estimation)
  const co2Reduction = computerCount * 0.025 * 3; // tonnes
  
  // Ordinateurs sauvés
  const computersSaved = Math.floor(computerCount * 0.3); // 30% auraient été remplacés
  
  return {
    money: totalMoneySavings,
    co2: co2Reduction,
    computers: computersSaved
  };
};

// Fonction de génération du plan d'action
const generateActionPlan = (answers, savings) => {
  return [
    {
      phase: 'Phase 1',
      title: 'Quick Wins (0-3 mois)',
      tasks: [
        'Tester Linux sur 5 ordinateurs pilotes',
        'Former 2 enseignants référents',
        'Migrer la suite bureautique vers LibreOffice'
      ],
      duration: '3 mois',
      savings: Math.floor(savings.money * 0.1),
      difficulty: 2
    },
    {
      phase: 'Phase 2',
      title: 'Transition (3-6 mois)',
      tasks: [
        `Déployer Linux sur ${Math.floor(answers.computerCount * 0.4)} ordinateurs`,
        'Sensibiliser élèves et parents',
        'Former l\'équipe technique'
      ],
      duration: '3 mois',
      savings: Math.floor(savings.money * 0.3),
      difficulty: 3
    },
    {
      phase: 'Phase 3',
      title: 'Autonomie (6-12 mois)',
      tasks: [
        `Migration complète des ${answers.computerCount} postes`,
        'Créer un club informatique élève',
        'Devenir établissement référent NIRD'
      ],
      duration: '6 mois',
      savings: Math.floor(savings.money * 0.6),
      difficulty: 4
    }
  ];
};

// @desc    Create diagnostic
// @route   POST /api/diagnostic
// @access  Private
exports.createDiagnostic = async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Calculer les résultats
    const dependencyScore = calculateDependencyScore(answers);
    const potentialSavings = calculateSavings(answers);
    const actionPlan = generateActionPlan(answers, potentialSavings);
    
    // Créer le diagnostic
    const diagnostic = await Diagnostic.create({
      userId: req.user.id,
      answers,
      results: {
        dependencyScore,
        potentialSavings,
        actionPlan,
        recommendedSolutions: [] // À remplir plus tard
      }
    });
    
    // Ajouter le diagnostic à l'utilisateur
    await User.findByIdAndUpdate(req.user.id, {
      $push: { diagnosticIds: diagnostic._id },
      $inc: { 'gamification.points': 50 } // +50 points pour le diagnostic
    });
    
    res.status(201).json({
      success: true,
      data: diagnostic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du diagnostic',
      error: error.message
    });
  }
};

// @desc    Get user diagnostics
// @route   GET /api/diagnostic
// @access  Private
exports.getDiagnostics = async (req, res) => {
  try {
    const diagnostics = await Diagnostic.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: diagnostics.length,
      data: diagnostics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des diagnostics'
    });
  }
};

// @desc    Get diagnostic by ID
// @route   GET /api/diagnostic/:id
// @access  Private
exports.getDiagnosticById = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findById(req.params.id);
    
    if (!diagnostic) {
      return res.status(404).json({
        success: false,
        message: 'Diagnostic non trouvé'
      });
    }
    
    // Vérifier que c'est bien le diagnostic de l'utilisateur
    if (diagnostic.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé'
      });
    }
    
    res.json({
      success: true,
      data: diagnostic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du diagnostic'
    });
  }
};