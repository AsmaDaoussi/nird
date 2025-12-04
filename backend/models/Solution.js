const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['os', 'bureautique', 'stockage', 'communication', 'securite', 'multimedia'],
    required: true
  },
  description: {
    short: String,
    long: String
  },
  logo: String,
  alternativeTo: [String], // Ex: ["Windows 10", "Windows 11"]
  
  metrics: {
    cost: {
      type: String,
      enum: ['gratuit', 'freemium', 'payant']
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    usedByCount: {
      type: Number,
      default: 0
    }
  },
  
  advantages: [String],
  disadvantages: [String],
  
  comparison: {
    costPerDevice: Number,
    co2Impact: Number,
    maintenanceTime: Number,
    requiredRAM: Number
  },
  
  resources: {
    officialSite: String,
    documentation: String,
    tutorialVideo: String,
    installGuide: String
  },
  
  targetAudience: {
    establishmentTypes: [String],
    technicalLevel: [String]
  },
  
  tags: [String],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Solution', solutionSchema);