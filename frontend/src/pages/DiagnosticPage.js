import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  Slider,
} from '@mui/material';
import {
  NavigateNext,
  NavigateBefore,
  CheckCircle,
  Assessment,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import diagnosticService from '../services/diagnosticService';

const steps = [
  'Établissement',
  'Infrastructure',
  'Budget & Besoins',
  'Niveau de Préparation',
];

const DiagnosticPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    establishmentType: 'college',
    computerCount: 50,
    currentOS: 'windows10',
    budgetLicenses: 0,
    hasITStaff: false,
    mainConcerns: [],
    readinessLevel: 'decouverte',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    });
  };

  const handleMultiSelectChange = (value) => {
    const currentConcerns = formData.mainConcerns;
    const newConcerns = currentConcerns.includes(value)
      ? currentConcerns.filter((c) => c !== value)
      : [...currentConcerns, value];

    setFormData({
      ...formData,
      mainConcerns: newConcerns,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await diagnosticService.createDiagnostic(formData);
      navigate(`/diagnostic/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du diagnostic');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Parlez-nous de votre établissement
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Ces informations nous permettront de personnaliser vos recommandations
            </Typography>

            <TextField
              fullWidth
              select
              label="Type d'établissement"
              value={formData.establishmentType}
              onChange={handleChange('establishmentType')}
              sx={{ mb: 3 }}
            >
              <MenuItem value="primaire">École Primaire</MenuItem>
              <MenuItem value="college">Collège</MenuItem>
              <MenuItem value="lycee">Lycée</MenuItem>
              <MenuItem value="universite">Université</MenuItem>
            </TextField>

            <Typography gutterBottom>
              Nombre d'ordinateurs : {formData.computerCount}
            </Typography>
            <Slider
              value={formData.computerCount}
              onChange={(e, value) =>
                setFormData({ ...formData, computerCount: value })
              }
              min={1}
              max={500}
              step={5}
              marks={[
                { value: 1, label: '1' },
                { value: 100, label: '100' },
                { value: 250, label: '250' },
                { value: 500, label: '500+' },
              ]}
              valueLabelDisplay="auto"
              sx={{ mb: 4 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.hasITStaff}
                  onChange={handleCheckboxChange('hasITStaff')}
                />
              }
              label="Nous avons du personnel IT dédié"
            />
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Votre infrastructure actuelle
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Aidez-nous à comprendre votre situation technique
            </Typography>

            <TextField
              fullWidth
              select
              label="Système d'exploitation principal"
              value={formData.currentOS}
              onChange={handleChange('currentOS')}
              sx={{ mb: 3 }}
              helperText="Quel système utilisez-vous majoritairement ?"
            >
              <MenuItem value="windows10">Windows 10</MenuItem>
              <MenuItem value="windows11">Windows 11</MenuItem>
              <MenuItem value="linux">Linux (Ubuntu, Debian, etc.)</MenuItem>
              <MenuItem value="macos">macOS</MenuItem>
              <MenuItem value="mix">Mix de plusieurs systèmes</MenuItem>
            </TextField>

            {(formData.currentOS === 'windows10' ||
              formData.currentOS === 'windows11') && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600}>
                  ⚠️ Windows 10 : Fin du support en octobre 2025
                </Typography>
                <Typography variant="body2">
                  Après cette date, vous n'aurez plus de mises à jour de sécurité.
                </Typography>
              </Alert>
            )}

            <TextField
              fullWidth
              type="number"
              label="Budget annuel licences logicielles (€)"
              value={formData.budgetLicenses}
              onChange={handleChange('budgetLicenses')}
              helperText="Estimation approximative (Windows, Office, etc.)"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Vos préoccupations principales
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Sélectionnez toutes les réponses qui s'appliquent
            </Typography>

            <FormGroup>
              {[
                { value: 'cout', label: '💰 Réduire les coûts' },
                { value: 'ecologie', label: '🌱 Impact écologique' },
                {
                  value: 'obsolescence',
                  label: '💻 Éviter l\'obsolescence programmée',
                },
                { value: 'autonomie', label: '🔓 Gagner en autonomie' },
                {
                  value: 'donnees',
                  label: '🔒 Protection des données (RGPD)',
                },
                { value: 'pedagogie', label: '📚 Valeur pédagogique' },
              ].map((concern) => (
                <Card
                  key={concern.value}
                  variant="outlined"
                  sx={{
                    mb: 1,
                    cursor: 'pointer',
                    border: formData.mainConcerns.includes(concern.value)
                      ? '2px solid #3b82f6'
                      : '1px solid #e5e7eb',
                    backgroundColor: formData.mainConcerns.includes(concern.value)
                      ? '#eff6ff'
                      : 'white',
                    '&:hover': {
                      borderColor: '#3b82f6',
                    },
                  }}
                  onClick={() => handleMultiSelectChange(concern.value)}
                >
                  <CardContent sx={{ py: 1.5 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.mainConcerns.includes(concern.value)}
                          onChange={() => handleMultiSelectChange(concern.value)}
                        />
                      }
                      label={concern.label}
                    />
                  </CardContent>
                </Card>
              ))}
            </FormGroup>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Niveau de préparation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Où en êtes-vous dans votre réflexion ?
            </Typography>

            <RadioGroup
              value={formData.readinessLevel}
              onChange={handleChange('readinessLevel')}
            >
              {[
                {
                  value: 'decouverte',
                  label: '🌱 Découverte',
                  desc: 'Je découvre le sujet, je me renseigne',
                },
                {
                  value: 'interesse',
                  label: '🤔 Intéressé',
                  desc: 'Je suis convaincu mais j\'ai des questions',
                },
                {
                  value: 'pret',
                  label: '✅ Prêt',
                  desc: 'Je suis prêt à passer à l\'action',
                },
                {
                  value: 'expert',
                  label: '⭐ Expert',
                  desc: 'J\'ai déjà de l\'expérience avec le libre',
                },
              ].map((level) => (
                <Card
                  key={level.value}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    border:
                      formData.readinessLevel === level.value
                        ? '2px solid #10b981'
                        : '1px solid #e5e7eb',
                    backgroundColor:
                      formData.readinessLevel === level.value
                        ? '#d1fae5'
                        : 'white',
                    '&:hover': {
                      borderColor: '#10b981',
                    },
                  }}
                  onClick={() =>
                    setFormData({ ...formData, readinessLevel: level.value })
                  }
                >
                  <CardContent>
                    <FormControlLabel
                      control={
                        <Radio checked={formData.readinessLevel === level.value} />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {level.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {level.desc}
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </motion.div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Assessment sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Diagnostic NIRD
          </Typography>
          <Typography variant="body1">
            Découvrez combien votre établissement peut économiser
          </Typography>
        </Paper>

        {/* Stepper */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <LinearProgress
              variant="determinate"
              value={(activeStep / steps.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: 'center' }}
            >
              Étape {activeStep + 1} sur {steps.length}
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Step Content */}
          <Box sx={{ minHeight: 300 }}>
            <AnimatePresence mode="wait">
              {getStepContent(activeStep)}
            </AnimatePresence>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<NavigateBefore />}
              sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
            >
              Précédent
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={<CheckCircle />}
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  px: 4,
                }}
              >
                {loading ? 'Analyse en cours...' : 'Obtenir mon Diagnostic'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NavigateNext />}
              >
                Suivant
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DiagnosticPage;