const Solution = require('../models/Solution');

// @desc    Get all solutions
// @route   GET /api/solutions
// @access  Public
exports.getSolutions = async (req, res) => {
  try {
    const { category, difficulty, cost } = req.query;
    
    // Construire le filtre
    let filter = {};
    if (category) filter.category = category;
    if (difficulty) filter['metrics.difficulty'] = { $lte: parseInt(difficulty) };
    if (cost) filter['metrics.cost'] = cost;
    
    const solutions = await Solution.find(filter).sort({ 'metrics.rating': -1 });
    
    res.json({
      success: true,
      count: solutions.length,
      data: solutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des solutions'
    });
  }
};

// @desc    Get solution by ID
// @route   GET /api/solutions/:id
// @access  Public
exports.getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: solution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la solution'
    });
  }
};

// @desc    Create solution
// @route   POST /api/solutions
// @access  Private (enseignant/direction)
exports.createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);
    
    res.status(201).json({
      success: true,
      data: solution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la solution',
      error: error.message
    });
  }
};

// @desc    Compare solutions
// @route   POST /api/solutions/compare
// @access  Public
exports.compareSolutions = async (req, res) => {
  try {
    const { solutionIds } = req.body;
    
    if (!solutionIds || solutionIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Au moins 2 solutions requises pour la comparaison'
      });
    }
    
    const solutions = await Solution.find({
      _id: { $in: solutionIds }
    });
    
    // Préparer la comparaison
    const comparison = solutions.map(sol => ({
      id: sol._id,
      name: sol.name,
      cost: sol.metrics.cost,
      difficulty: sol.metrics.difficulty,
      rating: sol.metrics.rating,
      costPerDevice: sol.comparison.costPerDevice,
      co2Impact: sol.comparison.co2Impact,
      maintenanceTime: sol.comparison.maintenanceTime,
      advantages: sol.advantages,
      disadvantages: sol.disadvantages
    }));
    
    res.json({
      success: true,
      data: comparison
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la comparaison'
    });
  }
};