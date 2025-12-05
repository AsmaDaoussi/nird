const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['eleve', 'enseignant', 'direction', 'collectivite'],
    default: 'enseignant'
  },
  establishment: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      enum: ['primaire', 'college', 'lycee', 'universite'],
      default: 'college'
    },
    city: {
      type: String,
      default: ''
    },
    region: {
      type: String,
      default: ''
    }
  },
  gamification: {
    level: {
      type: String,
      enum: ['apprenti', 'guerrier', 'gardien', 'champion'],
      default: 'apprenti'
    },
    points: {
      type: Number,
      default: 0
    },
    badges: [{
      name: String,
      earnedAt: Date,
      icon: String
    }]
  },
  diagnosticIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnostic'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// PAS DE HOOK pre-save - Hash manuel dans le controller

// Methode pour comparer les passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);