import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Chip,
  Grid,
  Alert,
} from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import forumService from '../services/forumService';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'aide',
    tags: '',
    metrics: {
      computersSaved: 0,
      moneySaved: 0,
      co2Reduced: 0,
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'aide', label: '🆘 Aide' },
    { value: 'success-story', label: '💡 Success Story' },
    { value: 'tutoriel', label: '🔧 Tutoriel' },
    { value: 'annonce', label: '📣 Annonce' },
  ];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleMetricsChange = (field) => (event) => {
    setFormData({
      ...formData,
      metrics: {
        ...formData.metrics,
        [field]: parseFloat(event.target.value) || 0,
      },
    });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      setError('Le titre et le contenu sont requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (formData.category === 'success-story') {
        postData.metrics = formData.metrics;
      }

      const response = await forumService.createPost(postData);
      navigate(`/forum/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
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

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            ✍️ Nouvelle Discussion
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Titre"
            value={formData.title}
            onChange={handleChange('title')}
            sx={{ mb: 3 }}
            placeholder="Donnez un titre clair à votre discussion"
          />

          <TextField
            fullWidth
            select
            label="Catégorie"
            value={formData.category}
            onChange={handleChange('category')}
            sx={{ mb: 3 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={10}
            label="Contenu"
            value={formData.content}
            onChange={handleChange('content')}
            sx={{ mb: 3 }}
            placeholder="Décrivez votre situation, question ou expérience..."
          />

          {formData.category === 'success-story' && (
            <Box sx={{ mb: 3, p: 3, backgroundColor: '#f0fdf4', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                📊 Partagez vos résultats (optionnel)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Ordinateurs sauvés"
                    value={formData.metrics.computersSaved}
                    onChange={handleMetricsChange('computersSaved')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Économies (€)"
                    value={formData.metrics.moneySaved}
                    onChange={handleMetricsChange('moneySaved')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="CO2 réduit (tonnes)"
                    value={formData.metrics.co2Reduced}
                    onChange={handleMetricsChange('co2Reduced')}
                    inputProps={{ step: 0.1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <TextField
            fullWidth
            label="Tags (séparés par des virgules)"
            value={formData.tags}
            onChange={handleChange('tags')}
            sx={{ mb: 3 }}
            placeholder="linux, budget, migration..."
            helperText="Les tags aident les autres à trouver votre discussion"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Send />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{ flexGrow: 1 }}
            >
              {loading ? 'Publication...' : 'Publier'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/forum')}
            >
              Annuler
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePostPage;