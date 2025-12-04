import API from './api';

const diagnosticService = {
  createDiagnostic: async (answers) => {
    const response = await API.post('/diagnostic', { answers });
    return response.data;
  },

  getDiagnostics: async () => {
    const response = await API.get('/diagnostic');
    return response.data;
  },

  getDiagnosticById: async (id) => {
    const response = await API.get(`/diagnostic/${id}`);
    return response.data;
  }
};

export default diagnosticService;