const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: {
    establishmentType: {
      type: String,
      enum: ['primaire', 'college', 'lycee', 'universite'],
      required: true
    },
    computerCount: {
      type: Number,
      required: true
    },
    currentOS: {
      type: String,
      enum: ['windows10', 'windows11', 'linux', 'macos', 'mix'],
      required: true
    },
    budgetLicenses: Number,
    hasITStaff: Boolean,
    mainConcerns: [String],
    readinessLevel: {
      type: String,
      enum: ['decouverte', 'interesse', 'pret', 'expert']
    }
  },
  results: {
    dependencyScore: {
      type: Number,
      min: 0,
      max: 100
    },
    potentialSavings: {
      money: Number,
      co2: Number,
      computers: Number
    },
    actionPlan: [{
      phase: String,
      title: String,
      tasks: [String],
      duration: String,
      savings: Number,
      difficulty: Number
    }],
    recommendedSolutions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solution'
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);