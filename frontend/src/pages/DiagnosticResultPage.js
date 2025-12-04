import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  TrendingDown,
  Computer,
  Co2,
  EuroSymbol,
  Download,
  Share,
  ExpandMore,
  Timeline,
  School,
  Build,
  Rocket,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import diagnosticService from '../services/diagnosticService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DiagnosticResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnostic, setDiagnostic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDiagnostic();
  }, [id]);

  const fetchDiagnostic = async () => {
    try {
      const response = await diagnosticService.getDiagnosticById(id);
      setDiagnostic(response.data);
    } catch (err) {
      setError('Erreur lors du chargement du diagnostic');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Chargement de votre diagnostic..." />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!diagnostic) return null;

  const { results, answers } = diagnostic;
  const { dependencyScore, potentialSavings, actionPlan } = results;

  // Données pour les graphiques
  const savingsData = [
    { name: 'Licences', value: potentialSavings.money * 0.6 },
    { name: 'Maintenance', value: potentialSavings.money * 0.25 },
    { name: 'Matériel évité', value: potentialSavings.money * 0.15 },
  ];

  const timelineData = actionPlan.map((phase) => ({
    name: phase.phase,
    économies: phase.savings,
    difficulté: phase.difficulty,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  const getDependencyLevel = (score) => {
    if (score >= 80) return { level: 'CRITIQUE', color: 'error', icon: '🚨' };
    if (score >= 60) return { level: 'ÉLEVÉ', color: 'warning', icon: '⚠️' };
    if (score >= 40) return { level: 'MODÉRÉ', color: 'info', icon: '📊' };
    return { level: 'FAIBLE', color: 'success', icon: '✅' };
  };

  const depLevel = getDependencyLevel(dependencyScore);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              📊 Votre Diagnostic NIRD
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Analyse complète de votre situation et plan d'action personnalisé
            </Typography>
          </Paper>
        </motion.div>

        {/* Score de Dépendance */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Score de Dépendance Big Tech
                  </Typography>
                  <Box sx={{ textAlign: 'center', my: 3 }}>
                    <Typography variant="h1" fontWeight={700} color={`${depLevel.color}.main`}>
                      {dependencyScore}
                      <Typography variant="h4" component="span" color="text.secondary">
                        /100
                      </Typography>
                    </Typography>
                    <Chip
                      label={`${depLevel.icon} Niveau ${depLevel.level}`}
                      color={depLevel.color}
                      sx={{ mt: 2, fontWeight: 600, fontSize: '1rem' }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dependencyScore}
                    color={depLevel.color}
                    sx={{ height: 12, borderRadius: 2 }}
                  />
                  {dependencyScore >= 70 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Votre dépendance aux Big Tech est élevée. Il est temps d'agir !
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Votre Infrastructure
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Type d'établissement"
                        secondary={answers.establishmentType.charAt(0).toUpperCase() + answers.establishmentType.slice(1)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Computer color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Nombre d'ordinateurs"
                        secondary={`${answers.computerCount} postes`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Système actuel"
                        secondary={answers.currentOS.toUpperCase()}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Économies Potentielles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              💰 Économies Potentielles (3 ans)
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {/* Budget */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: 'white',
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <EuroSymbol sx={{ fontSize: 50, mb: 1 }} />
                  <Typography variant="h3" fontWeight={700}>
                    {potentialSavings.money.toLocaleString()}€
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Budget économisé
                  </Typography>
                </Card>
              </Grid>

              {/* CO2 */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <Co2 sx={{ fontSize: 50, mb: 1 }} />
                  <Typography variant="h3" fontWeight={700}>
                    {potentialSavings.co2.toFixed(1)}t
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    CO2 évitées
                  </Typography>
                </Card>
              </Grid>

              {/* Ordinateurs */}
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <Computer sx={{ fontSize: 50, mb: 1 }} />
                  <Typography variant="h3" fontWeight={700}>
                    {potentialSavings.computers}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Ordinateurs sauvés
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Répartition des Économies */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Répartition des économies
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={savingsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value.toLocaleString()}€`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {savingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </motion.div>

        {/* Plan d'Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Timeline sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  🎯 Plan d'Action Personnalisé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Votre roadmap vers l'autonomie numérique
                </Typography>
              </Box>
            </Box>

            {/* Timeline Graph */}
            <Box sx={{ mb: 4 }}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="économies" fill="#3b82f6" name="Économies (€)" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Phases détaillées */}
            {actionPlan.map((phase, index) => (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box
                      sx={{
                        mr: 2,
                        fontSize: 40,
                      }}
                    >
                      {index === 0 ? '🌱' : index === 1 ? '⚙️' : '🚀'}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {phase.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {phase.phase} • Durée: {phase.duration}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${phase.savings.toLocaleString()}€`}
                      color="success"
                      sx={{ mr: 2 }}
                    />
                    <Chip
                      label={`Difficulté: ${phase.difficulty}/5`}
                      color={phase.difficulty <= 2 ? 'success' : phase.difficulty <= 3 ? 'warning' : 'error'}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Actions à réaliser :
                  </Typography>
                  <List>
                    {phase.tasks.map((task, taskIndex) => (
                      <ListItem key={taskIndex}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={task} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </motion.div>

        {/* Prochaines Étapes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              🚀 Prochaines Étapes
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.95 }}>
              Vous avez maintenant une vision claire de vos économies potentielles.
              Voici comment continuer :
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Download />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#f5576c',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#f8fafc' },
                  }}
                  onClick={() => window.print()}
                >
                  Télécharger PDF
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Share />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Partager
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Build />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => navigate('/solutions')}
                >
                  Voir Solutions
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<School />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => navigate('/forum')}
                >
                  Forum
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DiagnosticResultPage;