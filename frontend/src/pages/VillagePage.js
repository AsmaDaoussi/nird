import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  School,
  Build,
  Nature,
  Forum,
  Computer,
  Co2,
  Groups,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const VillagePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    computersSaved: 847,
    co2Reduced: 12.4,
    establishments: 34,
    activeCommunity: 156,
  });

  const zones = [
    {
      id: 'ecole',
      title: "L'École",
      subtitle: 'Découvrir',
      description: 'Comprendre pourquoi résister aux Big Tech et les enjeux du numérique libre',
      icon: <School sx={{ fontSize: 60 }} />,
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      path: '/solutions',
      features: ['Sensibilisation', 'Documentation', 'Vidéos explicatives'],
    },
    {
      id: 'atelier',
      title: "L'Atelier",
      subtitle: 'Solutions',
      description: 'Explorer les alternatives libres et comparer les solutions disponibles',
      icon: <Build sx={{ fontSize: 60 }} />,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
      path: '/solutions',
      features: ['Linux', 'LibreOffice', 'Nextcloud'],
    },
    {
      id: 'place-verte',
      title: 'Place Verte',
      subtitle: 'Impact',
      description: 'Mesurer votre empreinte écologique et découvrir vos économies potentielles',
      icon: <Nature sx={{ fontSize: 60 }} />,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      path: isAuthenticated ? '/diagnostic' : '/register',
      features: ['Diagnostic', 'Économies', 'Écologie'],
    },
    {
      id: 'forum',
      title: 'Le Forum',
      subtitle: 'Communauté',
      description: 'Échanger avec les résistants et partager vos expériences',
      icon: <Forum sx={{ fontSize: 60 }} />,
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      path: '/forum',
      features: ['Entraide', 'Success Stories', 'Tutoriels'],
    },
  ];

  const achievements = [
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Lycée Carnot',
      description: '120 PC sous Linux',
      savings: '18k€/an',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Collège Hugo',
      description: '30 PC sauvés',
      savings: '4.2k€',
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: '#3b82f6' }} />,
      title: 'École Pasteur',
      description: '15 tablettes',
      savings: '2.1k€',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              mb: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                fontSize: 200,
                opacity: 0.1,
              }}
            >
              🏰
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  🏰 Le Village Numérique Résistant
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  Astérix contre l'Empire numérique • David contre Goliath
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95 }}>
                  Bienvenue dans le village qui tient tête aux Big Tech. Explorez
                  nos quatre quartiers et découvrez comment votre établissement peut
                  devenir autonome, économe et écologique.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Box sx={{ fontSize: 120, lineHeight: 1 }}>🏰</Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={6} md={3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
                <Computer color="primary" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary">
                  {stats.computersSaved}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ordinateurs sauvés
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={6} md={3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
                <Co2 color="success" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {stats.co2Reduced}t
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  CO2 évitées
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={6} md={3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
                <School color="warning" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {stats.establishments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Établissements
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={6} md={3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
                <Groups color="secondary" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="secondary.main">
                  {stats.activeCommunity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Membres actifs
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Zones du Village */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            Explorez le Village
          </Typography>
          <Grid container spacing={3}>
            {zones.map((zone, index) => (
              <Grid item xs={12} md={6} key={zone.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card
                    elevation={4}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: 8,
                      },
                      overflow: 'hidden',
                    }}
                    onClick={() => navigate(zone.path)}
                  >
                    {/* Header avec gradient */}
                    <Box
                      sx={{
                        background: zone.bgGradient,
                        color: 'white',
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2 }}>{zone.icon}</Box>
                        <Box>
                          <Typography variant="h5" fontWeight={700}>
                            {zone.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ opacity: 0.9, fontWeight: 600 }}
                          >
                            {zone.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {zone.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {zone.features.map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              backgroundColor: `${zone.color}20`,
                              color: zone.color,
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: zone.bgGradient,
                          fontWeight: 600,
                          '&:hover': {
                            opacity: 0.9,
                          },
                        }}
                      >
                        Explorer →
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Success Stories */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            Ils l'ont fait ! 🎉
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                    {achievement.icon}
                    <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {achievement.description}
                    </Typography>
                    <Chip
                      label={`Économies: ${achievement.savings}`}
                      color="success"
                      sx={{ mt: 1, fontWeight: 600 }}
                    />
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Prêt à rejoindre la résistance ?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
              Commencez votre diagnostic pour découvrir comment votre établissement
              peut économiser, sauver des ordinateurs et réduire son empreinte
              carbone.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  navigate(isAuthenticated ? '/diagnostic' : '/register')
                }
                sx={{
                  backgroundColor: 'white',
                  color: '#f5576c',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                }}
              >
                {isAuthenticated ? 'Faire le Diagnostic' : 'Créer un Compte'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/forum')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Rejoindre le Forum
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default VillagePage;