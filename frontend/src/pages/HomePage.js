import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  Computer,
  Nature,
  Groups,
  TrendingDown,
  Security,
  EmojiObjects,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Computer sx={{ fontSize: 50 }} />,
      title: 'Sauver vos Ordinateurs',
      description: 'Évitez l\'obsolescence programmée grâce aux logiciels libres',
      color: '#3b82f6',
    },
    {
      icon: <Nature sx={{ fontSize: 50 }} />,
      title: 'Réduire votre Impact',
      description: 'Diminuez votre empreinte carbone et économisez les ressources',
      color: '#10b981',
    },
    {
      icon: <TrendingDown sx={{ fontSize: 50 }} />,
      title: 'Économiser le Budget',
      description: 'Jusqu\'à 80% d\'économies sur les licences logicielles',
      color: '#f59e0b',
    },
    {
      icon: <Security sx={{ fontSize: 50 }} />,
      title: 'Reprendre le Contrôle',
      description: 'Indépendance technologique et souveraineté numérique',
      color: '#8b5cf6',
    },
    {
      icon: <Groups sx={{ fontSize: 50 }} />,
      title: 'Rejoindre la Communauté',
      description: 'Entraide, partage d\'expériences et formation continue',
      color: '#ec4899',
    },
    {
      icon: <EmojiObjects sx={{ fontSize: 50 }} />,
      title: 'Innover Librement',
      description: 'Solutions open-source adaptables à vos besoins',
      color: '#06b6d4',
    },
  ];

  const stats = [
    { number: '847', label: 'Ordinateurs sauvés', icon: '💻' },
    { number: '12.4t', label: 'CO2 évitées', icon: '🌍' },
    { number: '34', label: 'Établissements', icon: '🏫' },
    { number: '250k€', label: 'Économisés', icon: '💰' },
  ];

  return (
    <Box sx={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h2"
                  fontWeight={700}
                  gutterBottom
                  sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                >
                  🏰 Le Village Numérique Résistant
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    opacity: 0.95,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  David contre Goliath • Astérix contre l'Empire numérique
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Face aux Big Tech, votre établissement peut devenir un village
                  résistant, ingénieux et autonome. Découvrez comment économiser,
                  réduire votre impact écologique et reprendre le contrôle de votre
                  infrastructure numérique.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/diagnostic')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#667eea',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                      },
                    }}
                  >
                    Commencer le Diagnostic
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/village')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Explorer le Village
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    fontSize: '200px',
                    lineHeight: 1,
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  🏰
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stat.icon}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary"
                    gutterBottom
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Pourquoi Rejoindre NIRD ?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            6 raisons de devenir un établissement résistant
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Problem Section */}
      <Box sx={{ backgroundColor: '#fee2e2', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom color="error">
                ⚠️ Le Problème
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Octobre 2025 :</strong> Fin du support de Windows 10
              </Typography>
              <Typography variant="body1" paragraph>
                Des milliers d'ordinateurs encore fonctionnels sont menacés
                d'obsolescence. Les établissements scolaires font face à :
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li>
                  <Typography variant="body1">
                    💰 Des coûts de licences exorbitants (145€/poste pour Windows 11)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    💻 Du matériel incompatible avec les nouvelles versions
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    🌍 Un impact environnemental catastrophique
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    🔒 Une dépendance totale aux Big Tech
                  </Typography>
                </li>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom color="success.main">
                ✅ La Solution NIRD
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Un numérique libre, responsable et durable</strong>
              </Typography>
              <Typography variant="body1" paragraph>
                En adoptant des solutions libres comme Linux, votre établissement peut :
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                <li>
                  <Typography variant="body1">
                    💰 Économiser jusqu'à 80% sur les licences
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    💻 Sauver tous vos ordinateurs existants
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    🌍 Réduire drastiquement votre empreinte carbone
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    🔓 Gagner en autonomie et souveraineté
                  </Typography>
                </li>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Success Stories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Ils l'ont fait !
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Des établissements qui ont rejoint la résistance
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🏫 Lycée Carnot - Bruay
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                120 PC sous Linux, économies de 18 000€/an, formation d'un club
                élève qui aide d'autres établissements.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Chip label="💰 18k€" color="success" />
                <Chip label="💻 120 PC" color="primary" />
                <Chip label="🌍 3.2t CO2" color="warning" />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🏫 Collège Victor Hugo - Lille
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                30 PC sauvés de la benne, satisfaction élèves à 89%, temps
                d'adaptation : 2 semaines seulement.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Chip label="💰 4.2k€" color="success" />
                <Chip label="💻 30 PC" color="primary" />
                <Chip label="😊 89%" color="info" />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🏫 École Primaire Pasteur
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                15 tablettes reconditionnées, projet pédagogique sur
                l'écologie numérique, budget divisé par 3.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Chip label="💰 2.1k€" color="success" />
                <Chip label="📱 15 tab" color="primary" />
                <Chip label="📚 Péda" color="secondary" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Prêt à Résister ?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
            Commencez votre diagnostic en 5 minutes et découvrez combien votre
            établissement peut économiser
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: 'white',
                color: '#f5576c',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            >
              Créer un Compte
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/village')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Voir la Démo
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

// Chip component (simple)
const Chip = ({ label, color }) => (
  <Box
    sx={{
      display: 'inline-block',
      px: 1.5,
      py: 0.5,
      borderRadius: 2,
      fontSize: '0.875rem',
      fontWeight: 600,
      backgroundColor:
        color === 'success'
          ? '#d1fae5'
          : color === 'primary'
          ? '#dbeafe'
          : color === 'warning'
          ? '#fef3c7'
          : color === 'info'
          ? '#e0f2fe'
          : '#f3e8ff',
      color:
        color === 'success'
          ? '#065f46'
          : color === 'primary'
          ? '#1e40af'
          : color === 'warning'
          ? '#92400e'
          : color === 'info'
          ? '#075985'
          : '#6b21a8',
    }}
  >
    {label}
  </Box>
);

export default HomePage;