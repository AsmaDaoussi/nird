import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Rating,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Close,
  TrendingUp,
  Speed,
  AttachMoney,
  School,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Données mockées (même structure que SolutionsPage)
const MOCK_SOLUTIONS = [
  {
    _id: '1',
    name: 'Ubuntu 24.04 LTS',
    category: 'os',
    description: { 
      short: 'Distribution Linux la plus populaire pour les débutants',
      long: 'Ubuntu est une distribution Linux basée sur Debian, reconnue pour sa facilité d\'utilisation et sa large communauté.'
    },
    logo: '🐧',
    metrics: {
      cost: 'gratuit',
      difficulty: 2,
      rating: 4.8,
      usedByCount: 47,
      estimatedSavings: 145,
      co2Impact: 0.025
    },
    alternativeTo: ['Windows 10', 'Windows 11'],
    advantages: [
      'Gratuit et open-source',
      'Interface intuitive',
      'Nécessite peu de ressources',
      'Mises à jour gratuites 5 ans',
      'Grande communauté francophone'
    ],
    disadvantages: [
      'Période d\'adaptation nécessaire',
      'Certains logiciels Windows non disponibles',
      'Formation du support technique'
    ],
    tags: ['Linux', 'Éducation', 'Open Source'],
    resources: {
      officialSite: 'https://ubuntu.com',
      documentation: 'https://doc.ubuntu-fr.org'
    },
    compatibility: {
      minRAM: 2,
      minStorage: 25,
      minProcessor: 'Dual Core 1GHz'
    }
  },
  {
    _id: '2',
    name: 'Linux Mint 21',
    category: 'os',
    description: { 
      short: 'Distribution Linux très proche de Windows',
      long: 'Linux Mint est basé sur Ubuntu mais propose une interface encore plus familière pour les utilisateurs de Windows.'
    },
    logo: '🌿',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.9,
      usedByCount: 32,
      estimatedSavings: 145,
      co2Impact: 0.025
    },
    alternativeTo: ['Windows 10', 'Windows 11'],
    advantages: [
      'Interface identique à Windows 7',
      'Très stable et fiable',
      'Parfait pour débutants',
      'Codecs multimédia inclus'
    ],
    disadvantages: [
      'Moins de logiciels préinstallés',
      'Mises à jour moins fréquentes'
    ],
    tags: ['Linux', 'Windows-like', 'Débutant'],
    resources: {
      officialSite: 'https://linuxmint.com'
    },
    compatibility: {
      minRAM: 2,
      minStorage: 20,
      minProcessor: 'Dual Core 1GHz'
    }
  },
  {
    _id: '3',
    name: 'LibreOffice 7.6',
    category: 'bureautique',
    description: { 
      short: 'Suite bureautique complète et gratuite',
      long: 'LibreOffice comprend Writer, Calc, Impress et bien plus. Compatible avec les formats Microsoft Office.'
    },
    logo: '📄',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.5,
      usedByCount: 52,
      estimatedSavings: 120,
      co2Impact: 0
    },
    alternativeTo: ['Microsoft Office', 'Office 365'],
    advantages: [
      '100% gratuit',
      'Compatible Office',
      'Multi-plateforme',
      'Mode hors ligne',
      'Respect de la vie privée'
    ],
    disadvantages: [
      'Interface différente de MS Office',
      'Quelques incompatibilités mineures'
    ],
    tags: ['Bureautique', 'Open Source'],
    resources: {
      officialSite: 'https://fr.libreoffice.org'
    }
  },
  {
    _id: '4',
    name: 'OnlyOffice',
    category: 'bureautique',
    description: { 
      short: 'Interface identique à Microsoft Office',
      long: 'OnlyOffice offre une compatibilité maximale avec Microsoft Office.'
    },
    logo: '📊',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.6,
      usedByCount: 28,
      estimatedSavings: 120,
      co2Impact: 0
    },
    alternativeTo: ['Microsoft Office'],
    advantages: [
      'Interface identique MS Office',
      'Excellente compatibilité',
      'Collaboration temps réel'
    ],
    disadvantages: [
      'Moins de fonctionnalités',
      'Plus gourmand en ressources'
    ],
    tags: ['Bureautique', 'Compatible Office']
  },
  {
    _id: '5',
    name: 'Nextcloud',
    category: 'stockage',
    description: { 
      short: 'Plateforme de stockage auto-hébergée',
      long: 'Nextcloud est une solution de stockage cloud que vous hébergez vous-même.'
    },
    logo: '☁️',
    metrics: {
      cost: 'gratuit',
      difficulty: 3,
      rating: 4.6,
      usedByCount: 28,
      estimatedSavings: 200,
      co2Impact: 0.1
    },
    alternativeTo: ['Google Drive', 'OneDrive'],
    advantages: [
      'Données sous votre contrôle',
      'Capacité illimitée',
      'Multi-appareils'
    ],
    disadvantages: [
      'Nécessite un serveur',
      'Configuration technique'
    ],
    tags: ['Cloud', 'RGPD']
  },
  {
    _id: '6',
    name: 'Thunderbird',
    category: 'communication',
    description: { 
      short: 'Client email Mozilla',
      long: 'Client de messagerie open-source avec support email, calendrier et contacts.'
    },
    logo: '📧',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.4,
      usedByCount: 35,
      estimatedSavings: 80,
      co2Impact: 0
    },
    alternativeTo: ['Outlook'],
    advantages: [
      'Gratuit et open-source',
      'Multi-comptes',
      'Calendrier intégré'
    ],
    disadvantages: [
      'Interface datée'
    ],
    tags: ['Email', 'Mozilla']
  },
  {
    _id: '7',
    name: 'GIMP',
    category: 'multimedia',
    description: { 
      short: 'Retouche d\'image professionnelle',
      long: 'Alternative gratuite à Photoshop.'
    },
    logo: '🎨',
    metrics: {
      cost: 'gratuit',
      difficulty: 3,
      rating: 4.2,
      usedByCount: 18,
      estimatedSavings: 240,
      co2Impact: 0
    },
    alternativeTo: ['Photoshop'],
    advantages: [
      'Fonctionnalités pro',
      'Multi-formats'
    ],
    disadvantages: [
      'Interface complexe'
    ],
    tags: ['Image', 'Design']
  },
  {
    _id: '8',
    name: 'VLC Media Player',
    category: 'multimedia',
    description: { 
      short: 'Lecteur multimédia universel',
      long: 'Lit tous les formats audio et vidéo.'
    },
    logo: '🎬',
    metrics: {
      cost: 'gratuit',
      difficulty: 1,
      rating: 4.9,
      usedByCount: 65,
      estimatedSavings: 0,
      co2Impact: 0
    },
    alternativeTo: ['Windows Media Player'],
    advantages: [
      'Lit tous les formats',
      'Gratuit et léger'
    ],
    disadvantages: [
      'Interface basique'
    ],
    tags: ['Vidéo', 'Audio']
  }
];

const SolutionComparePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const ids = idsParam.split(',');
      console.log('🔍 [Compare] IDs à comparer:', ids);
      
      const selectedSolutions = MOCK_SOLUTIONS.filter(s => ids.includes(s._id));
      console.log('✅ [Compare] Solutions trouvées:', selectedSolutions.length);
      setSolutions(selectedSolutions);
    }
  }, [searchParams]);

  if (solutions.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Aucune solution à comparer
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/solutions')}
            sx={{ mt: 2 }}
          >
            Retour aux solutions
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/solutions')}
            sx={{ mb: 2 }}
          >
            Retour aux solutions
          </Button>
          
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              ⚖️ Comparaison de Solutions
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.95 }}>
              {solutions.length} solutions sélectionnées
            </Typography>
          </Paper>
        </Box>

        {/* Comparaison en Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {solutions.map((solution) => (
            <Grid item xs={12} md={12 / solutions.length} key={solution._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        fontSize: 50,
                        margin: '0 auto 16px',
                        backgroundColor: 'transparent',
                      }}
                    >
                      {solution.logo}
                    </Avatar>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {solution.name}
                    </Typography>
                    <Rating value={solution.metrics.rating} precision={0.1} readOnly />
                    <Typography variant="caption" display="block" color="text.secondary">
                      {solution.metrics.usedByCount} établissements
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Métriques */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoney sx={{ mr: 1, color: '#10b981' }} />
                      <Typography variant="body2">
                        <strong>Coût:</strong> {solution.metrics.cost}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Speed sx={{ mr: 1, color: '#3b82f6' }} />
                      <Typography variant="body2">
                        <strong>Difficulté:</strong> {solution.metrics.difficulty}/5
                      </Typography>
                    </Box>
                    {solution.metrics.estimatedSavings > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TrendingUp sx={{ mr: 1, color: '#f59e0b' }} />
                        <Typography variant="body2">
                          <strong>Économies:</strong> {solution.metrics.estimatedSavings}€/PC
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Alternative à */}
                  {solution.alternativeTo && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Alternative à:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {solution.alternativeTo.map((alt, idx) => (
                          <Chip key={idx} label={alt} size="small" />
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Avantages */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom color="success.main">
                      ✓ Avantages
                    </Typography>
                    {solution.advantages.slice(0, 3).map((adv, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 0.5, mt: 0.2 }} />
                        <Typography variant="caption">{adv}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Inconvénients */}
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom color="error.main">
                      ✗ Points d'attention
                    </Typography>
                    {solution.disadvantages.slice(0, 2).map((dis, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                        <Close sx={{ fontSize: 16, color: 'error.main', mr: 0.5, mt: 0.2 }} />
                        <Typography variant="caption">{dis}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => navigate(`/solutions/${solution._id}`)}
                  >
                    Voir les détails
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Tableau de comparaison détaillé */}
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Critère</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center" sx={{ fontWeight: 600 }}>
                      {solution.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Note globale</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center">
                      <Rating value={solution.metrics.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" display="block">
                        {solution.metrics.rating}/5
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Coût</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center">
                      <Chip label={solution.metrics.cost} size="small" color="success" />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Difficulté</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center">
                      <Chip 
                        label={`${solution.metrics.difficulty}/5`}
                        size="small"
                        color={
                          solution.metrics.difficulty <= 2 ? 'success' :
                          solution.metrics.difficulty <= 3 ? 'warning' : 'error'
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Utilisateurs</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center">
                      <School sx={{ mr: 0.5, fontSize: 18, verticalAlign: 'middle' }} />
                      {solution.metrics.usedByCount}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Économies/PC</TableCell>
                  {solutions.map((solution) => (
                    <TableCell key={solution._id} align="center">
                      {solution.metrics.estimatedSavings > 0 ? (
                        <Typography variant="body2" fontWeight={600} color="success.main">
                          {solution.metrics.estimatedSavings}€
                        </Typography>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {solutions[0].compatibility && (
                  <>
                    <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                      <TableCell sx={{ fontWeight: 600 }}>RAM minimum</TableCell>
                      {solutions.map((solution) => (
                        <TableCell key={solution._id} align="center">
                          {solution.compatibility?.minRAM || '-'} Go
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Stockage minimum</TableCell>
                      {solutions.map((solution) => (
                        <TableCell key={solution._id} align="center">
                          {solution.compatibility?.minStorage || '-'} Go
                        </TableCell>
                      ))}
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* CTA */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Prêt à faire votre choix ?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            Lancez un diagnostic personnalisé pour obtenir des recommandations adaptées à votre établissement
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              Faire un diagnostic
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/solutions')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 700,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Voir plus de solutions
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SolutionComparePage;