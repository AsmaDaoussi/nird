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
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Search,
  Computer,
  Description,
  Cloud,
  Message,
  Videocam,
  FilterList,
  Compare,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// ==================== DONNÉES MOCK ====================
const MOCK_SOLUTIONS = [
  {
    _id: '1',
    name: 'Ubuntu 24.04 LTS',
    category: 'os',
    description: { 
      short: 'Distribution Linux la plus populaire pour les débutants',
    },
    logo: '🐧',
    metrics: {
      cost: 'gratuit',
      difficulty: 2,
      rating: 4.8,
      usedByCount: 47,
      estimatedSavings: 145,
    },
    alternativeTo: ['Windows 10', 'Windows 11', 'macOS'],
    tags: ['Linux', 'Éducation', 'Open Source'],
  },
  {
    _id: '2',
    name: 'Linux Mint 21',
    category: 'os',
    description: { 
      short: 'Distribution Linux très proche de Windows, idéale pour la transition',
    },
    logo: '🌿',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.9,
      usedByCount: 32,
      estimatedSavings: 145,
    },
    alternativeTo: ['Windows 10', 'Windows 11'],
    tags: ['Linux', 'Windows-like', 'Débutant'],
  },
  {
    _id: '3',
    name: 'LibreOffice 7.6',
    category: 'bureautique',
    description: { 
      short: 'Suite bureautique complète et gratuite, compatible Microsoft Office',
    },
    logo: '📄',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.5,
      usedByCount: 52,
      estimatedSavings: 120,
    },
    alternativeTo: ['Microsoft Office', 'Office 365'],
    tags: ['Bureautique', 'Documents', 'Open Source'],
  },
  {
    _id: '4',
    name: 'OnlyOffice',
    category: 'bureautique',
    description: { 
      short: 'Suite bureautique avec interface identique à Microsoft Office',
    },
    logo: '📊',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.6,
      usedByCount: 28,
      estimatedSavings: 120,
    },
    alternativeTo: ['Microsoft Office', 'Office 365'],
    tags: ['Bureautique', 'Compatible Office'],
  },
  {
    _id: '5',
    name: 'Nextcloud',
    category: 'stockage',
    description: { 
      short: 'Plateforme de stockage et collaboration auto-hébergée',
    },
    logo: '☁️',
    metrics: {
      cost: 'gratuit',
      difficulty: 3,
      rating: 4.6,
      usedByCount: 28,
      estimatedSavings: 200,
    },
    alternativeTo: ['Google Drive', 'OneDrive', 'Dropbox'],
    tags: ['Cloud', 'Stockage', 'RGPD'],
  },
  {
    _id: '6',
    name: 'Thunderbird',
    category: 'communication',
    description: { 
      short: 'Client email complet et gratuit développé par Mozilla',
    },
    logo: '📧',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.4,
      usedByCount: 35,
      estimatedSavings: 80,
    },
    alternativeTo: ['Microsoft Outlook', 'Apple Mail'],
    tags: ['Email', 'Messagerie', 'Open Source'],
  },
  {
    _id: '7',
    name: 'GIMP',
    category: 'multimedia',
    description: { 
      short: 'Logiciel de retouche d\'image professionnel et gratuit',
    },
    logo: '🎨',
    metrics: {
      cost: 'gratuit',
      difficulty: 3,
      rating: 4.2,
      usedByCount: 18,
      estimatedSavings: 240,
    },
    alternativeTo: ['Adobe Photoshop'],
    tags: ['Image', 'Retouche', 'Design'],
  },
  {
    _id: '8',
    name: 'VLC Media Player',
    category: 'multimedia',
    description: { 
      short: 'Lecteur multimédia universel',
    },
    logo: '🎬',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.9,
      usedByCount: 65,
      estimatedSavings: 0,
    },
    alternativeTo: ['Windows Media Player', 'QuickTime'],
    tags: ['Vidéo', 'Audio', 'Multimédia'],
  }
];

const SolutionsPage = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [costFilter, setCostFilter] = useState('all');
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { value: 'all', label: 'Tout', icon: <FilterList /> },
    { value: 'os', label: 'Système', icon: <Computer /> },
    { value: 'bureautique', label: 'Bureautique', icon: <Description /> },
    { value: 'stockage', label: 'Stockage', icon: <Cloud /> },
    { value: 'communication', label: 'Communication', icon: <Message /> },
    { value: 'multimedia', label: 'Multimédia', icon: <Videocam /> },
  ];

  // Chargement initial des solutions
  useEffect(() => {
    console.log('🔄 [SolutionsPage] Chargement des solutions...');
    setSolutions(MOCK_SOLUTIONS);
    console.log('✅ [SolutionsPage] Solutions chargées:', MOCK_SOLUTIONS.length);
  }, []);

  // Debug: Surveiller les changements de sélection
  useEffect(() => {
    console.log('📊 [SolutionsPage] Sélection changée:', selectedForComparison);
  }, [selectedForComparison]);

  // Comptage par catégorie
  const getCategoryCount = (cat) => {
    if (cat === 'all') return solutions.length;
    return solutions.filter(s => s.category === cat).length;
  };

  // Filtrage
  let filteredSolutions = solutions.filter((solution) => {
    const matchSearch = solution.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === 'all' || solution.category === category;
    const matchCost = costFilter === 'all' || solution.metrics.cost === costFilter;
    return matchSearch && matchCategory && matchCost;
  });

  // Tri
  filteredSolutions = [...filteredSolutions].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.metrics.rating - a.metrics.rating;
      case 'popularity':
        return b.metrics.usedByCount - a.metrics.usedByCount;
      case 'savings':
        return (b.metrics.estimatedSavings || 0) - (a.metrics.estimatedSavings || 0);
      case 'difficulty':
        return a.metrics.difficulty - b.metrics.difficulty;
      default:
        return 0;
    }
  });

  // Gestion de la sélection pour comparaison
  const handleComparisonToggle = (solutionId) => {
    console.log('🔘 [handleComparisonToggle] Clic sur solution ID:', solutionId);
    console.log('📋 [handleComparisonToggle] Sélection AVANT:', selectedForComparison);
    
    if (selectedForComparison.includes(solutionId)) {
      // Retirer de la sélection
      const newSelection = selectedForComparison.filter((id) => id !== solutionId);
      setSelectedForComparison(newSelection);
      console.log('➖ [handleComparisonToggle] Retiré, sélection:', newSelection);
    } else {
      // Ajouter à la sélection (max 3)
      if (selectedForComparison.length < 3) {
        const newSelection = [...selectedForComparison, solutionId];
        setSelectedForComparison(newSelection);
        console.log('➕ [handleComparisonToggle] Ajouté, sélection:', newSelection);
      } else {
        console.log('⚠️ [handleComparisonToggle] Maximum 3 solutions atteint');
      }
    }
  };

  // Navigation vers la page de comparaison
  const handleCompare = () => {
    console.log('🔍 [handleCompare] Clic sur bouton COMPARER');
    console.log('📋 [handleCompare] IDs sélectionnés:', selectedForComparison);
    
    if (selectedForComparison.length >= 2) {
      const url = `/solutions/compare?ids=${selectedForComparison.join(',')}`;
      console.log('✅ [handleCompare] Navigation vers:', url);
      navigate(url);
    } else {
      console.log('❌ [handleCompare] Pas assez de solutions (minimum 2)');
    }
  };

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
            <Typography variant="body1" sx={{ opacity: 0.95, mb: 3 }}>
              Découvrez les alternatives open-source aux logiciels propriétaires
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {solutions.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Solutions disponibles
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    100%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Gratuites
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    250
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Établissements
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700}>
                    15k€
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Économies moyennes/an
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Filters */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
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
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Coût"
                value={costFilter}
                onChange={(e) => setCostFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="gratuit">Gratuit</MenuItem>
                <MenuItem value="freemium">Freemium</MenuItem>
                <MenuItem value="payant">Payant</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                fullWidth
                select
                label="Trier par"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
              >
                <MenuItem value="rating">⭐ Note</MenuItem>
                <MenuItem value="popularity">👥 Popularité</MenuItem>
                <MenuItem value="savings">💰 Économies</MenuItem>
                <MenuItem value="difficulty">📊 Difficulté</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              {selectedForComparison.length >= 2 && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Compare />}
                  onClick={handleCompare}
                  sx={{ height: '40px' }}
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
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {cat.label}
                    <Badge badgeContent={getCategoryCount(cat.value)} color="primary" />
                  </Box>
                }
                icon={cat.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* Solutions Grid */}
        <Grid container spacing={3}>
          {filteredSolutions.map((solution, index) => (
            <Grid item xs={12} sm={6} md={4} key={solution._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ height: '100%' }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    border: selectedForComparison.includes(solution._id)
                      ? '3px solid #3b82f6'
                      : '1px solid #e5e7eb',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => navigate(`/solutions/${solution._id}`)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Logo et Nom */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
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
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {solution.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
                      sx={{ mb: 2, minHeight: 40 }}
                    >
                      {solution.description.short}
                    </Typography>

                    {/* Alternative à */}
                    {solution.alternativeTo && solution.alternativeTo.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Alternative à:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                          {solution.alternativeTo.slice(0, 2).map((alt, idx) => (
                            <Chip 
                              key={idx} 
                              label={alt} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Métriques */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                      <Chip
                        label="💰 Gratuit"
                        size="small"
                        color="success"
                      />
                      <Chip
                        label={`📊 ${solution.metrics.difficulty}/5`}
                        size="small"
                        color={
                          solution.metrics.difficulty <= 2 ? 'success' :
                          solution.metrics.difficulty <= 3 ? 'warning' : 'error'
                        }
                      />
                      {solution.metrics.estimatedSavings > 0 && (
                        <Chip
                          label={`${solution.metrics.estimatedSavings}€`}
                          size="small"
                          color="info"
                        />
                      )}
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {solution.tags.slice(0, 3).map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{ fontSize: '0.65rem', height: 20 }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  {/* Actions */}
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={selectedForComparison.includes(solution._id) ? 'contained' : 'outlined'}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('🖱️ Clic bouton Comparer sur card, ID:', solution._id);
                        handleComparisonToggle(solution._id);
                      }}
                      disabled={
                        !selectedForComparison.includes(solution._id) &&
                        selectedForComparison.length >= 3
                      }
                    >
                      {selectedForComparison.includes(solution._id) ? '✓ Sélectionné' : 'Comparer'}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredSolutions.length === 0 && (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>🔍</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Aucune solution trouvée
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Essayez de modifier vos filtres de recherche
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setCostFilter('all');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </Paper>
        )}

        {/* Info Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 6, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                💡 Besoin d'aide pour choisir ?
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.95 }}>
                Notre diagnostic personnalisé vous recommande les meilleures solutions 
                adaptées à votre établissement.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/diagnostic')}
                sx={{
                  backgroundColor: 'white',
                  color: '#f5576c',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                }}
              >
                Faire le diagnostic
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default SolutionsPage;