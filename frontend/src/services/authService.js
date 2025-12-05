import API from './api';

const authService = {
  register: async (userData) => {
    try {
      console.log('📤 [authService] Envoi:', userData);
      
      const response = await API.post('/auth/register', userData);
      
      console.log('📥 [authService] Reponse:', response);
      console.log('📥 [authService] Data:', response.data);
      
      if (response.data && response.data.success) {
        const { token, user } = response.data.data;
        
        if (token) {
          console.log('💾 [authService] Sauvegarde token');
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          console.log('✅ [authService] Token sauvegarde');
        } else {
          console.error('⚠️ [authService] Pas de token dans la reponse');
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ [authService] Erreur complete:', error);
      console.error('❌ [authService] Response:', error.response);
      console.error('❌ [authService] Data:', error.response?.data);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('📤 [authService] Login:', credentials.email);
      
      const response = await API.post('/auth/login', credentials);
      
      console.log('📥 [authService] Login reponse:', response.data);
      
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('❌ [authService] Erreur login:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  }
};

export default authService;