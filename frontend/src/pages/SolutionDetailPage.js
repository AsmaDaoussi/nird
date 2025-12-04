import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Close,
  Download,
  Launch,
  School,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import solutionService from '../services/solutionService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SolutionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolution();
  }, [id]);

  const fetchSolution = async () => {
    try {
      const response = await solutionService.getSolutionById(id);
      setSolution(response.data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!solution) return <Typography>Solution non trouvée</Typography>;

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/solutions')}
          sx={{ mb: 3 }}
        >
          Retour aux solutions
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 50, mr: 3 }}>
                  {solution.logo}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    {solution.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Rating value={solution.metrics.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({solution.metrics.usedByCount} établissements)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {solution.description.long || solution.description.short}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} gutterBottom>
                ✅ Avantages
              </Typography>
              <List>
                {solution.advantages?.map((adv, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={adv} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
                ⚠️ Points d'attention
              </Typography>
              <List>
                {solution.disadvantages?.map((dis, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <Close color="error" />
                    </ListItemIcon>
                    <ListItemText primary={dis} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                📊 Informations
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Coût
                </Typography>
                <Chip label={solution.metrics.cost} color="success" sx={{ mb: 2 }} />

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Difficulté
                </Typography>
                <Rating value={solution.metrics.difficulty} readOnly sx={{ mb: 2 }} />

                <Divider sx={{ my: 2 }} />

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Launch />}
                  sx={{ mb: 1 }}
                  href={solution.resources?.officialSite}
                  target="_blank"
                >
                  Site Officiel
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Download />}
                  href={solution.resources?.installGuide}
                  target="_blank"
                >
                  Guide d'installation
                </Button>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🎓 Utilisé par
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <School color="primary" />
                <Typography variant="body2">
                  {solution.metrics.usedByCount} établissements scolaires
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionDetailPage;