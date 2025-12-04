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
  Avatar,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Forum as ForumIcon,
  Add,
  Search,
  ThumbUp,
  Comment,
  PushPin,
  TrendingUp,
  School,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import forumService from '../services/forumService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ForumPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'Tout', icon: '📚' },
    { value: 'aide', label: 'Aide', icon: '🆘' },
    { value: 'success-story', label: 'Success Stories', icon: '💡' },
    { value: 'tutoriel', label: 'Tutoriels', icon: '🔧' },
    { value: 'annonce', label: 'Annonces', icon: '📣' },
  ];

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const filters = category !== 'all' ? { category } : {};
      const response = await forumService.getPosts(filters);
      setPosts(response.data);
    } catch (err) {
      console.error('Erreur:', err);
      // Mock data
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const mockPosts = [
    {
      _id: '1',
      title: 'Comment convaincre mon principal ?',
      content: 'Bonjour à tous ! J\'ai fait le diagnostic NIRD...',
      category: 'aide',
      authorId: {
        name: 'Marie Dupont',
        establishment: { name: 'Collège Jean Moulin' },
      },
      likes: ['1', '2', '3'],
      comments: [{ authorId: {} }, { authorId: {} }],
      isPinned: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
      tags: ['budget', 'direction'],
    },
    {
      _id: '2',
      title: '🎉 30 PC sauvés grâce à Linux !',
      content: 'Success story : Nous avons migré 30 ordinateurs...',
      category: 'success-story',
      authorId: {
        name: 'Jean Martin',
        establishment: { name: 'Lycée Carnot' },
      },
      likes: ['1', '2', '3', '4', '5'],
      comments: [{ authorId: {} }],
      metrics: {
        computersSaved: 30,
        moneySaved: 4200,
        co2Reduced: 0.8,
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      tags: ['linux', 'migration'],
    },
  ];

  const displayPosts = posts.length > 0 ? posts : mockPosts;

  const filteredPosts = displayPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (cat) => {
    const colors = {
      aide: 'error',
      'success-story': 'success',
      tutoriel: 'info',
      annonce: 'warning',
    };
    return colors[cat] || 'default';
  };

  if (loading && posts.length === 0) {
    return <LoadingSpinner message="Chargement du forum..." />;
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
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  💬 Forum de la Communauté
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95 }}>
                  Partagez, apprenez et grandissez ensemble
                </Typography>
              </Box>
              {isAuthenticated && (
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/forum/create')}
                  sx={{
                    backgroundColor: 'white',
                    color: '#f59e0b',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#f8fafc' },
                  }}
                >
                  Nouvelle Discussion
                </Button>
              )}
            </Box>
          </Paper>
        </motion.div>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                📊 Statistiques
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Discussions
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {displayPosts.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Membres actifs
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    156
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Établissements
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    34
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Top Contributors */}
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🏆 Top Contributeurs
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { name: 'Jean Martin', posts: 45, avatar: '👨‍🏫' },
                  { name: 'Sophie Durand', posts: 38, avatar: '👩‍🏫' },
                  { name: 'Pierre Lefort', posts: 32, avatar: '👨‍💼' },
                ].map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1.5,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': { backgroundColor: '#f8fafc' },
                    }}
                  >
                    <Avatar sx={{ width: 40, height: 40, mr: 1.5, fontSize: 20 }}>
                      {user.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.posts} posts
                      </Typography>
                    </Box>
                    {index === 0 && <EmojiEvents sx={{ color: '#f59e0b' }} />}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Search and Filter */}
            <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <TextField
                fullWidth
                placeholder="Rechercher une discussion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
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
                    label={`${cat.icon} ${cat.label}`}
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Posts List */}
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: post.isPinned ? '2px solid #f59e0b' : 'none',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => navigate(`/forum/${post._id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          mr: 2,
                          backgroundColor: 'primary.main',
                        }}
                      >
                        {post.authorId.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          {post.isPinned && (
                            <PushPin sx={{ fontSize: 18, color: '#f59e0b' }} />
                          )}
                          <Typography variant="h6" fontWeight={600}>
                            {post.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {post.authorId.name}
                          </Typography>
                          {post.authorId.establishment && (
                            <>
                              <Typography variant="body2" color="text.secondary">
                                •
                              </Typography>
                              <School sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {post.authorId.establishment.name}
                              </Typography>
                            </>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDistanceToNow(new Date(post.createdAt), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={categories.find((c) => c.value === post.category)?.label}
                        color={getCategoryColor(post.category)}
                        size="small"
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.content}
                    </Typography>

                    {/* Success Story Metrics */}
                    {post.category === 'success-story' && post.metrics && (
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          mb: 2,
                          p: 2,
                          backgroundColor: '#d1fae5',
                          borderRadius: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            💻 Ordinateurs
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {post.metrics.computersSaved}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            💰 Économies
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {post.metrics.moneySaved}€
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            🌍 CO2
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {post.metrics.co2Reduced}t
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                        {post.tags.map((tag, idx) => (
                          <Chip key={idx} label={`#${tag}`} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}

                    {/* Stats */}
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUp sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {post.likes.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Comment sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {post.comments.length}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <Paper elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                <ForumIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Aucune discussion trouvée
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Soyez le premier à poster !
                </Typography>
                {isAuthenticated && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/forum/create')}
                    sx={{ mt: 2 }}
                  >
                    Créer une Discussion
                  </Button>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ForumPage;