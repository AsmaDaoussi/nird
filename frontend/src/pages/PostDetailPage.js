import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  TextField,
  Divider,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  Reply,
  ArrowBack,
  School,
  Delete,
  Edit,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../context/AuthContext';
import forumService from '../services/forumService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await forumService.getPostById(id);
      setPost(response.data);
      setIsLiked(response.data.likes.includes(user?.id));
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await forumService.likePost(id);
      setIsLiked(!isLiked);
      fetchPost();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      await forumService.addComment(id, commentText);
      setCommentText('');
      fetchPost();
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <Typography>Post non trouvé</Typography>;

  const getCategoryColor = (cat) => {
    const colors = {
      aide: 'error',
      'success-story': 'success',
      tutoriel: 'info',
      annonce: 'warning',
    };
    return colors[cat] || 'default';
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/forum')}
          sx={{ mb: 3 }}
        >
          Retour au forum
        </Button>

        {/* Post Content */}
        <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
              {post.authorId.name.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {post.authorId.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {post.authorId.establishment && (
                  <>
                    <School sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {post.authorId.establishment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                  </>
                )}
                <Typography variant="body2" color="text.secondary">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </Typography>
              </Box>
            </Box>
            <Chip label={post.category} color={getCategoryColor(post.category)} />
          </Box>

          <Typography variant="h4" fontWeight={700} gutterBottom>
            {post.title}
          </Typography>

          <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>

          {/* Success Story Metrics */}
          {post.category === 'success-story' && post.metrics && (
            <Card sx={{ backgroundColor: '#d1fae5', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  📊 Résultats
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      💻 Ordinateurs sauvés
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {post.metrics.computersSaved}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      💰 Économies
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {post.metrics.moneySaved}€
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      🌍 CO2 réduit
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {post.metrics.co2Reduced}t
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {post.tags.map((tag, idx) => (
                <Chip key={idx} label={`#${tag}`} size="small" variant="outlined" />
              ))}
            </Box>
          )}

          {/* Actions */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
              onClick={handleLike}
              disabled={!isAuthenticated}
              variant={isLiked ? 'contained' : 'outlined'}
            >
              {post.likes.length} J'aime
            </Button>
            <Button startIcon={<Reply />} disabled={!isAuthenticated}>
              {post.comments.length} Commentaires
            </Button>
          </Box>
        </Paper>

        {/* Add Comment */}
        {isAuthenticated && (
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              💬 Ajouter un commentaire
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Partagez votre avis..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleComment}>
              Publier
            </Button>
          </Paper>
        )}

        {/* Comments List */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Commentaires ({post.comments.length})
        </Typography>
        {post.comments.map((comment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                  {comment.authorId.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {comment.authorId.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">{comment.content}</Typography>
            </Paper>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
};

export default PostDetailPage;