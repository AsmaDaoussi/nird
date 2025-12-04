import API from './api';

const solutionService = {
  getSolutions: async (filters = {}) => {
    const response = await API.get('/solutions', { params: filters });
    return response.data;
  },

  getSolutionById: async (id) => {
    const response = await API.get(`/solutions/${id}`);
    return response.data;
  },

  compareSolutions: async (solutionIds) => {
    const response = await API.post('/solutions/compare', { solutionIds });
    return response.data;
  }
};

export default solutionService;