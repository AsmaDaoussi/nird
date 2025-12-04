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
    select: false // Ne pas renvoyer le password par défaut
  },
  role: {
    type: String,
    enum: ['eleve', 'enseignant', 'direction', 'collectivite'],
    default: 'enseignant'
  },
  establishment: {
    name: String,
    type: {
      type: String,
      enum: ['primaire', 'college', 'lycee', 'universite']
    },
    city: String,
    region: String
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

// Hash password avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);