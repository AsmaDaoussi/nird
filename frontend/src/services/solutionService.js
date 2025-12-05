import API from './api';

const solutionService = {
  // Récupérer toutes les solutions avec filtres
  getSolutions: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      console.log('📤 [solutionService] Récupération solutions avec filtres:', filters);
      const response = await API.get(`/solutions?${params}`);
      console.log('📥 [solutionService] Solutions reçues:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ [solutionService] Erreur getSolutions:', error);
      // Retourner des données mock en cas d'erreur
      return { data: getMockSolutions(filters) };
    }
  },

  // Récupérer une solution par ID
  getSolutionById: async (id) => {
    try {
      console.log('📤 [solutionService] Récupération solution ID:', id);
      const response = await API.get(`/solutions/${id}`);
      console.log('📥 [solutionService] Solution reçue:', response.data.name);
      return response.data;
    } catch (error) {
      console.error('❌ [solutionService] Erreur getSolutionById:', error);
      // Retourner mock data
      return { data: getMockSolutionById(id) };
    }
  },

  // Comparer plusieurs solutions
  compareSolutions: async (ids) => {
    try {
      console.log('📤 [solutionService] Comparaison solutions:', ids);
      const response = await API.post('/solutions/compare', { ids });
      console.log('📥 [solutionService] Comparaison reçue');
      return response.data;
    } catch (error) {
      console.error('❌ [solutionService] Erreur compareSolutions:', error);
      // Retourner mock comparison
      return { data: getMockComparison(ids) };
    }
  },

  // Créer une nouvelle solution (admin)
  createSolution: async (solutionData) => {
    try {
      const response = await API.post('/solutions', solutionData);
      return response.data;
    } catch (error) {
      console.error('❌ [solutionService] Erreur createSolution:', error);
      throw error;
    }
  },

  // Rechercher des solutions
  searchSolutions: async (query) => {
    try {
      const response = await API.get(`/solutions/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('❌ [solutionService] Erreur searchSolutions:', error);
      throw error;
    }
  }
};

// ==================== MOCK DATA ====================

const getMockSolutions = (filters = {}) => {
  const allSolutions = [
    {
      _id: '1',
      name: 'Ubuntu 24.04 LTS',
      category: 'os',
      description: { 
        short: 'Distribution Linux la plus populaire pour les débutants',
        long: 'Ubuntu est une distribution Linux basée sur Debian, reconnue pour sa facilité d\'utilisation et sa large communauté. La version LTS (Long Term Support) bénéficie de 5 ans de mises à jour de sécurité, ce qui en fait un choix idéal pour les établissements scolaires.'
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
      alternativeTo: ['Windows 10', 'Windows 11', 'macOS'],
      advantages: [
        'Gratuit et open-source',
        'Interface intuitive similaire à Windows',
        'Nécessite peu de ressources (fonctionne sur vieux PC)',
        'Mises à jour de sécurité gratuites pendant 5 ans',
        'Grande communauté francophone',
        'Logithèque complète incluse'
      ],
      disadvantages: [
        'Nécessite une période d\'adaptation (1-2 semaines)',
        'Certains logiciels Windows ne sont pas disponibles',
        'Support technique interne à former'
      ],
      tags: ['Linux', 'Éducation', 'Open Source', 'LTS', 'Débutant'],
      resources: {
        officialSite: 'https://ubuntu.com',
        documentation: 'https://doc.ubuntu-fr.org',
        installGuide: 'https://ubuntu.com/tutorials/install-ubuntu-desktop',
        tutorialVideos: ['https://youtube.com/watch?v=ubuntu-tutorial'],
        community: 'https://forum.ubuntu-fr.org'
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
        short: 'Distribution Linux très proche de Windows, idéale pour la transition',
        long: 'Linux Mint est basé sur Ubuntu mais propose une interface encore plus familière pour les utilisateurs de Windows. C\'est le choix parfait pour une migration en douceur.'
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
        'Interface quasi-identique à Windows 7',
        'Très stable et fiable',
        'Parfait pour les débutants',
        'Codecs multimédia inclus',
        'Excellent pour le matériel ancien'
      ],
      disadvantages: [
        'Moins de logiciels préinstallés qu\'Ubuntu',
        'Mises à jour moins fréquentes'
      ],
      tags: ['Linux', 'Windows-like', 'Débutant', 'Stable'],
      resources: {
        officialSite: 'https://linuxmint.com',
        documentation: 'https://linuxmint.com/documentation.php',
        installGuide: 'https://linuxmint-installation-guide.readthedocs.io'
      }
    },
    {
      _id: '3',
      name: 'LibreOffice 7.6',
      category: 'bureautique',
      description: { 
        short: 'Suite bureautique complète et gratuite, compatible Microsoft Office',
        long: 'LibreOffice est une suite bureautique puissante qui comprend un traitement de texte (Writer), un tableur (Calc), un logiciel de présentation (Impress) et bien plus. Compatible avec les formats Microsoft Office.'
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
        '100% gratuit, aucun coût de licence',
        'Compatible avec les fichiers Word, Excel, PowerPoint',
        'Fonctionne sur Windows, Mac et Linux',
        'Mises à jour régulières',
        'Mode hors ligne complet',
        'Respecte votre vie privée (pas de télémétrie)'
      ],
      disadvantages: [
        'Interface légèrement différente de Microsoft Office',
        'Quelques incompatibilités mineures avec les fichiers complexes',
        'Moins de modèles prêts à l\'emploi'
      ],
      tags: ['Bureautique', 'Documents', 'Open Source', 'Compatible Office'],
      resources: {
        officialSite: 'https://fr.libreoffice.org',
        documentation: 'https://fr.libreoffice.org/get-help/documentation',
        installGuide: 'https://fr.libreoffice.org/download/telecharger-libreoffice'
      }
    },
    {
      _id: '4',
      name: 'OnlyOffice',
      category: 'bureautique',
      description: { 
        short: 'Suite bureautique avec interface identique à Microsoft Office',
        long: 'OnlyOffice offre une compatibilité maximale avec Microsoft Office grâce à une interface quasi-identique. Idéal pour une transition sans formation.'
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
      alternativeTo: ['Microsoft Office', 'Office 365'],
      advantages: [
        'Interface identique à Microsoft Office',
        'Excellente compatibilité avec les formats Office',
        'Collaboration en temps réel',
        'Version cloud et desktop'
      ],
      disadvantages: [
        'Moins de fonctionnalités avancées que LibreOffice',
        'Plus gourmand en ressources'
      ],
      tags: ['Bureautique', 'Compatible Office', 'Collaboration'],
      resources: {
        officialSite: 'https://www.onlyoffice.com',
        documentation: 'https://helpcenter.onlyoffice.com'
      }
    },
    {
      _id: '5',
      name: 'Nextcloud',
      category: 'stockage',
      description: { 
        short: 'Plateforme de stockage et collaboration auto-hébergée',
        long: 'Nextcloud est une solution de stockage cloud que vous hébergez vous-même, garantissant la confidentialité de vos données. Inclut le partage de fichiers, l\'édition collaborative, le calendrier et bien plus.'
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
      alternativeTo: ['Google Drive', 'OneDrive', 'Dropbox'],
      advantages: [
        'Données 100% sous votre contrôle (RGPD)',
        'Capacité illimitée (selon votre serveur)',
        'Synchronisation multi-appareils',
        'Collaboration en temps réel',
        'Applications mobiles disponibles'
      ],
      disadvantages: [
        'Nécessite un serveur ou hébergement',
        'Configuration technique initiale',
        'Maintenance et sauvegardes à gérer'
      ],
      tags: ['Cloud', 'Stockage', 'RGPD', 'Auto-hébergé'],
      resources: {
        officialSite: 'https://nextcloud.com',
        documentation: 'https://docs.nextcloud.com'
      }
    },
    {
      _id: '6',
      name: 'Thunderbird',
      category: 'communication',
      description: { 
        short: 'Client email complet et gratuit développé par Mozilla',
        long: 'Thunderbird est un client de messagerie open-source qui supporte les emails, calendriers et contacts. Alternative parfaite à Outlook.'
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
      alternativeTo: ['Microsoft Outlook', 'Apple Mail'],
      advantages: [
        'Gratuit et open-source',
        'Support multi-comptes',
        'Calendrier intégré',
        'Filtres anti-spam puissants'
      ],
      disadvantages: [
        'Interface un peu datée',
        'Pas de collaboration en temps réel'
      ],
      tags: ['Email', 'Messagerie', 'Open Source'],
      resources: {
        officialSite: 'https://www.thunderbird.net',
        documentation: 'https://support.mozilla.org/fr/products/thunderbird'
      }
    },
    {
      _id: '7',
      name: 'GIMP',
      category: 'multimedia',
      description: { 
        short: 'Logiciel de retouche d\'image professionnel et gratuit',
        long: 'GIMP (GNU Image Manipulation Program) est un logiciel de retouche photo puissant, alternative gratuite à Photoshop.'
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
      alternativeTo: ['Adobe Photoshop'],
      advantages: [
        'Gratuit et open-source',
        'Fonctionnalités professionnelles',
        'Supporte de nombreux formats'
      ],
      disadvantages: [
        'Interface complexe pour débutants',
        'Courbe d\'apprentissage'
      ],
      tags: ['Image', 'Retouche', 'Design'],
      resources: {
        officialSite: 'https://www.gimp.org',
        documentation: 'https://docs.gimp.org'
      }
    },
    {
      _id: '8',
      name: 'VLC Media Player',
      category: 'multimedia',
      description: { 
        short: 'Lecteur multimédia universel',
        long: 'VLC est le couteau suisse du multimédia, capable de lire pratiquement tous les formats audio et vidéo.'
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
      alternativeTo: ['Windows Media Player', 'QuickTime'],
      advantages: [
        'Lit tous les formats',
        'Gratuit et sans publicité',
        'Léger et rapide'
      ],
      disadvantages: ['Interface basique'],
      tags: ['Vidéo', 'Audio', 'Multimédia'],
      resources: {
        officialSite: 'https://www.videolan.org/vlc'
      }
    }
  ];

  // Appliquer les filtres
  let filtered = allSolutions;
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(s => s.category === filters.category);
  }
  
  if (filters.cost && filters.cost !== 'all') {
    filtered = filtered.filter(s => s.metrics.cost === filters.cost);
  }
  
  return filtered;
};

const getMockSolutionById = (id) => {
  const solutions = getMockSolutions();
  return solutions.find(s => s._id === id) || solutions[0];
};

const getMockComparison = (ids) => {
  const solutions = getMockSolutions();
  return solutions.filter(s => ids.includes(s._id));
};

export default solutionService;