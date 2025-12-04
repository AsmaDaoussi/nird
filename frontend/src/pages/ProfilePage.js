import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  School,
  CheckCircle,
  Lock,
  Edit,
  Share,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import gamificationService from '../services/gamificationService';
import diagnosticService from '../services/diagnosticService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [diagnostics, setDiagnostics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, diagnosticsRes, leaderboardRes] = await Promise.all([
        gamificationService.getProfile(),
        diagnosticService.getDiagnostics(),
        gamificationService.getLeaderboard('points', 10),
      ]);
      setProfile(profileRes.data);
      setDiagnostics(diagnosticsRes.data);
      setLeaderboard(leaderboardRes.data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Chargement de votre profil..." />;

  const gamification = user?.gamification || {
    level: 'apprenti',
    points: 0,
    badges: [],
  };

  const levels = [
    { name: 'apprenti', threshold: 0, icon: '🌱', color: '#10b981' },
    { name: 'guerrier', threshold: 100, icon: '⚔️', color: '#3b82f6' },
    { name: 'gardien', threshold: 300, icon: '🛡️', color: '#8b5cf6' },
    { name: 'champion', threshold: 600, icon: '⭐', color: '#f59e0b' },
  ];

  const currentLevelIndex = levels.findIndex((l) => l.name === gamification.level);
  const currentLevel = levels[currentLevelIndex];
  const nextLevel = levels[currentLevelIndex + 1];
  const progressToNextLevel = nextLevel
    ? ((gamification.points - currentLevel.threshold) /
        (nextLevel.threshold - currentLevel.threshold)) *
      100
    : 100;

  const allBadges = [
    {
      id: 'eclaireur',
      name: 'Éclaireur',
      icon: '🔍',
      description: 'Diagnostic complété',
      earned: gamification.badges.some((b) => b.name === 'Éclaireur'),
    },
    {
      id: 'curieux',
      name: 'Curieux',
      icon: '📚',
      description: '3 solutions consultées',
      earned: gamification.badges.some((b) => b.name === 'Curieux'),
    },
    {
      id: 'ambassadeur',
      name: 'Ambassadeur',
      icon: '👨‍🏫',
      description: 'Partage avec l\'équipe',
      earned: gamification.badges.some((b) => b.name === 'Ambassadeur'),
    },
    {
      id: 'pilote',
      name: 'Pilote',
      icon: '🧪',
      description: 'Installation Linux pilote',
      earned: gamification.badges.some((b) => b.name === 'Pilote'),
    },
    {
      id: 'formateur',
      name: 'Formateur',
      icon: '🎓',
      description: 'Formation de collègues',
      earned: gamification.badges.some((b) => b.name === 'Formateur'),
    },
    {
      id: 'econome',
      name: 'Économe',
      icon: '💰',
      description: '1000€ économisés',
      earned: gamification.badges.some((b) => b.name === 'Économe'),
    },
    {
      id: 'pingouin',
      name: 'Pingouin d\'Or',
      icon: '🐧',
      description: 'Migration Linux complète',
      earned: gamification.badges.some((b) => b.name === 'Pingouin d\'Or'),
    },
    {
      id: 'ecochampion',
      name: 'Éco-Champion',
      icon: '♻️',
      description: 'Reconditionnement matériel',
      earned: gamification.badges.some((b) => b.name === 'Éco-Champion'),
    },
  ];

  const earnedBadges = allBadges.filter((b) => b.earned);
  const lockedBadges = allBadges.filter((b) => !b.earned);

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              background: `linear-gradient(135deg, ${currentLevel.color} 0%, ${currentLevel.color}dd 100%)`,
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: 50,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '4px solid white',
                  }}
                >
                  {currentLevel.icon}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {user.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Chip
                    label={`${currentLevel.icon} ${currentLevel.name.toUpperCase()}`}
                    sx={{
                      backgroundColor: 'white',
                      color: currentLevel.color,
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  />
                  <Chip
                    label={`${gamification.points} points`}
                    icon={<Star />}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School sx={{ fontSize: 20 }} />
                  <Typography variant="body1">
                    {user.establishment?.name || 'Établissement non renseigné'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  sx={{
                    backgroundColor: 'white',
                    color: currentLevel.color,
                    '&:hover': { backgroundColor: '#f8fafc' },
                  }}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Progression Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    📈 Votre Progression
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Niveau actuel: {currentLevel.name.toUpperCase()}
                      </Typography>
                      {nextLevel && (
                        <Typography variant="body2" color="text.secondary">
                          Prochain niveau: {nextLevel.name.toUpperCase()}
                        </Typography>
                      )}
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progressToNextLevel}
                      sx={{
                        height: 12,
                        borderRadius: 2,
                        backgroundColor: '#e5e7eb',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: currentLevel.color,
                        },
                      }}
                    />
                    {nextLevel && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Plus que {nextLevel.threshold - gamification.points} points pour
                        atteindre {nextLevel.name} {nextLevel.icon}
                      </Typography>
                    )}
                  </Box>

                  {/* Levels Timeline */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    {levels.map((level, index) => (
                      <Box
                        key={level.name}
                        sx={{
                          textAlign: 'center',
                          opacity: index <= currentLevelIndex ? 1 : 0.4,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            fontSize: 30,
                            backgroundColor:
                              index <= currentLevelIndex ? level.color : '#e5e7eb',
                            mb: 1,
                            mx: 'auto',
                          }}
                        >
                          {level.icon}
                        </Avatar>
                        <Typography variant="caption" fontWeight={600}>
                          {level.name}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {level.threshold}pts
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      🏆 Badges ({earnedBadges.length}/{allBadges.length})
                    </Typography>
                    <Button size="small" startIcon={<Share />}>
                      Partager
                    </Button>
                  </Box>

                  <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{ mb: 3 }}
                  >
                    <Tab label={`Obtenus (${earnedBadges.length})`} />
                    <Tab label={`À débloquer (${lockedBadges.length})`} />
                  </Tabs>

                  {/* Earned Badges */}
                  {tabValue === 0 && (
                    <Grid container spacing={2}>
                      {earnedBadges.map((badge, index) => (
                        <Grid item xs={6} sm={4} md={3} key={badge.id}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Paper
                              elevation={2}
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#fef3c7',
                                border: '2px solid #f59e0b',
                              }}
                            >
                              <Typography variant="h2" sx={{ mb: 1 }}>
                                {badge.icon}
                              </Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {badge.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {badge.description}
                              </Typography>
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))}
                      {earnedBadges.length === 0 && (
                        <Grid item xs={12}>
                          <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body1" color="text.secondary">
                              Aucun badge obtenu pour le moment
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Complétez des actions pour débloquer des badges !
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  )}

                  {/* Locked Badges */}
                  {tabValue === 1 && (
                    <Grid container spacing={2}>
                      {lockedBadges.map((badge, index) => (
                        <Grid item xs={6} sm={4} md={3} key={badge.id}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f3f4f6',
                                opacity: 0.6,
                                position: 'relative',
                              }}
                            >
                              <Lock
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  fontSize: 16,
                                  color: 'text.secondary',
                                }}
                              />
                              <Typography
                                variant="h2"
                                sx={{ mb: 1, filter: 'grayscale(100%)' }}
                              >
                                {badge.icon}
                              </Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {badge.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {badge.description}
                              </Typography>
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Next Objectives */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    🎯 Prochains Objectifs
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Diagnostic complété"
                        secondary="+50 points"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid #e5e7eb',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Partager une success story"
                        secondary="+30 points"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid #e5e7eb',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Inviter un collègue"
                        secondary="+40 points"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid #e5e7eb',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Installer Linux (PC pilote)"
                        secondary="+50 points"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      🏆 Classement
                    </Typography>
                    <EmojiEvents sx={{ color: '#f59e0b', fontSize: 28 }} />
                  </Box>
                  <List dense>
                    {leaderboard.slice(0, 5).map((entry, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          backgroundColor:
                            entry.name === user.name ? '#eff6ff' : 'transparent',
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: 16,
                              backgroundColor:
                                index === 0
                                  ? '#f59e0b'
                                  : index === 1
                                  ? '#94a3b8'
                                  : index === 2
                                  ? '#cd7f32'
                                  : '#e5e7eb',
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={entry.name}
                          secondary={entry.establishment}
                          primaryTypographyProps={{
                            fontWeight: entry.name === user.name ? 700 : 400,
                          }}
                        />
                        <Typography variant="body2" fontWeight={600}>
                          {entry.points}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                    Voir le classement complet
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* My Diagnostics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    📊 Mes Diagnostics
                  </Typography>
                  {diagnostics.length > 0 ? (
                    <List>
                      {diagnostics.slice(0, 3).map((diag, index) => (
                        <ListItem
                          key={diag._id}
                          button
                          onClick={() => navigate(`/diagnostic/${diag._id}`)}
                        >
                          <ListItemIcon>
                            <TrendingUp color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Diagnostic ${index + 1}`}
                            secondary={new Date(diag.createdAt).toLocaleDateString('fr-FR')}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Aucun diagnostic effectué
                      </Typography>
                      <Button variant="contained" sx={{ mt: 2 }}>
                        Faire mon diagnostic
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;