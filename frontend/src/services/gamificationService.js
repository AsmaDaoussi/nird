import API from './api';

const gamificationService = {
  getProfile: async () => {
    const response = await API.get('/gamification/profile');
    return response.data;
  },

  addPoints: async (points, action) => {
    const response = await API.post('/gamification/points', { points, action });
    return response.data;
  },

  earnBadge: async (badgeKey) => {
    const response = await API.post('/gamification/badges', { badgeKey });
    return response.data;
  },

  getLeaderboard: async (type = 'points', limit = 10) => {
    const response = await API.get('/gamification/leaderboard', {
      params: { type, limit }
    });
    return response.data;
  }
};

export default gamificationService;