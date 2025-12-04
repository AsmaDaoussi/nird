const express = require('express');
const router = express.Router();
const {
  getSolutions,
  getSolutionById,
  createSolution,
  compareSolutions
} = require('../controllers/solutionController');
const { protect, authorize } = require('../middleware/auth');

// Routes publiques
router.get('/', getSolutions);
router.get('/:id', getSolutionById);
router.post('/compare', compareSolutions);

// Routes admin (création de solutions)
router.post('/', protect, authorize('direction', 'enseignant'), createSolution);

module.exports = router;