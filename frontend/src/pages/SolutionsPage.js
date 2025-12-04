import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  MenuItem,
  Paper,
  Rating,
  Avatar,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Computer,
  Description,
  Cloud,
  Message,
  Security,
  Videocam,
  FilterList,
  Compare,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import solutionService from '../services/solutionService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SolutionsPage = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [costFilter, setCostFilter] = useState('all');
  const [selectedForComparison, setSelectedForComparison] = useState([]);

  const categories = [
    { value: 'all', label: 'Tout', icon: <FilterList /> },
    { value: 'os', label: 'Système', icon: <Computer /> },
    { value: 'bureautique', label: 'Bureautique', icon: <Description /> },
    { value: 'stockage', label: 'Stockage', icon: <Cloud /> },
    { value: 'communication', label: 'Communication', icon: <Message /> },
    { value: 'securite', label: 'Sécurité', icon: <Security /> },
    { value: 'multimedia', label: 'Multimédia', icon: <Videocam /> },
  ];

  useEffect(() => {
    fetchSolutions();
  }, [category, costFilter]);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (category !== 'all') filters.category = category;
      if (costFilter !== 'all') filters.cost = costFilter;

      const response = await solutionService.getSolutions(filters);
      setSolutions(response.data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSolutions = solutions.filter((solution) =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComparisonToggle = (solutionId) => {
    if (selectedForComparison.includes(solutionId)) {
      setSelectedForComparison(selectedForComparison.filter((id) => id !== solutionId));
    } else {
      if (selectedForComparison.length < 3) {
        setSelectedForComparison([...selectedForComparison, solutionId]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      navigate(`/solutions/compare?ids=${selectedForComparison.join(',')}`);
    }
  };

  // Mock data si pas de backend
  const mockSolutions = [
    {
      _id: '1',
      name: 'Ubuntu 24.04 LTS',
      category: 'os',
      description: { short: 'Système d\'exploitation libre et gratuit' },
      logo: '🐧',
      metrics: {
        cost: 'gratuit',
        difficulty: 2,
        rating: 4.8,
        usedByCount: 47,
      },
      alternativeTo: ['Windows 10', 'Windows 11'],
      tags: ['Linux', 'Éducation', 'Open Source'],
    },
    {
      _id: '2',
      name: 'LibreOffice',
      category: 'bureautique',
      description: { short: 'Suite bureautique complète et gratuite' },
      logo: '📄',
      metrics: {
        cost: 'gratuit',
        difficulty: 1,
        rating: 4.5,
        usedByCount: 52,
      },
      alternativeTo: ['Microsoft Office', 'Office 365'],
      tags: ['Bureautique', 'Documents', 'Open Source'],
    },
    {
      _id: '3',
      name: 'Nextcloud',
      category: 'stockage',
      description: { short: 'Plateforme de stockage et collaboration' },
      logo: '☁️',
      metrics: {
        cost: 'gratuit',
        difficulty: 3,
        rating: 4.6,
        usedByCount: 28,
      },
      alternativeTo: ['Google Drive', 'OneDrive'],
      tags: ['Cloud', 'Collaboration', 'RGPD'],
    },
  ];

  const displaySolutions = solutions.length > 0 ? filteredSolutions : mockSolutions;

  if (loading && solutions.length === 0) {
    return <LoadingSpinner message="Chargement des solutions..." />;
  }

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
              🔧 Bibliothèque de Solutions Libres
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.95 }}>
              Découvrez les alternatives open-source aux logiciels propriétaires
            </Typography>
          </Paper>
        </motion.div>

        {/* Filters */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Rechercher une solution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Coût"
                value={costFilter}
                onChange={(e) => setCostFilter(e.target.value)}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="gratuit">Gratuit</MenuItem>
                <MenuItem value="freemium">Freemium</MenuItem>
                <MenuItem value="payant">Payant</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {selectedForComparison.length >= 2 && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Compare />}
                  onClick={handleCompare}
                  sx={{ height: '56px' }}
                >
                  Comparer ({selectedForComparison.length})
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Categories Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={category}
            onChange={(e, newValue) => setCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((cat) => (
              <Tab
                key={cat.value}
                value={cat.value}
                label={cat.label}
                icon={cat.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* Solutions Grid */}
        <Grid container spacing={3}>
          {displaySolutions.map((solution, index) => (
            <Grid item xs={12} sm={6} md={4} key={solution._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    border: selectedForComparison.includes(solution._id)
                      ? '2px solid #3b82f6'
                      : '1px solid transparent',
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => navigate(`/solutions/${solution._id}`)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Logo et Nom */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          fontSize: 40,
                          mr: 2,
                          backgroundColor: 'transparent',
                        }}
                      >
                        {solution.logo}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {solution.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={solution.metrics.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                          />
                          <Typography variant="caption" color="text.secondary">
                            ({solution.metrics.usedByCount})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{
                        minHeight: 40,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {solution.description.short}
                    </Typography>

                    {/* Alternative à */}
                    {solution.alternativeTo && solution.alternativeTo.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          Alternative à:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                          {solution.alternativeTo.map((alt, idx) => (
                            <Chip key={idx} label={alt} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      <Chip
                        label={solution.metrics.cost === 'gratuit' ? '💰 Gratuit' : solution.metrics.cost}
                        size="small"
                        color="success"
                      />
                      <Chip
                        label={`Difficulté: ${solution.metrics.difficulty}/5`}
                        size="small"
                        color={
                          solution.metrics.difficulty <= 2
                            ? 'success'
                            : solution.metrics.difficulty <= 3
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </Box>

                    {/* Tags thématiques */}
                    {solution.tags && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {solution.tags.slice(0, 3).map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag}
                            size="small"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>

                  {/* Actions */}
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={selectedForComparison.includes(solution._id) ? 'contained' : 'outlined'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComparisonToggle(solution._id);
                      }}
                      disabled={
                        !selectedForComparison.includes(solution._id) &&
                        selectedForComparison.length >= 3
                      }
                    >
                      {selectedForComparison.includes(solution._id)
                        ? '✓ Sélectionné'
                        : 'Comparer'}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {displaySolutions.length === 0 && (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Aucune solution trouvée
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Essayez de modifier vos filtres
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default SolutionsPage;