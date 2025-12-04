const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch((err) => console.error('❌ Erreur MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🏰 Bienvenue sur l\'API NIRD!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      diagnostic: '/api/diagnostic',
      solutions: '/api/solutions',
      forum: '/api/forum',
      gamification: '/api/gamification'
    }
  });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/diagnostic', require('./routes/diagnosticRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/gamification', require('./routes/gamificationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Erreur serveur', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});