const express = require('express');
const router = express.Router();
const {
  createDiagnostic,
  getDiagnostics,
  getDiagnosticById
} = require('../controllers/diagnosticController');
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

router.route('/')
  .post(createDiagnostic)
  .get(getDiagnostics);

router.route('/:id')
  .get(getDiagnosticById);

module.exports = router;
