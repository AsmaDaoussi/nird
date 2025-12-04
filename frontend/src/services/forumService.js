import API from './api';

const forumService = {
  getPosts: async (filters = {}) => {
    const response = await API.get('/forum', { params: filters });
    return response.data;
  },

  getPostById: async (id) => {
    const response = await API.get(`/forum/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await API.post('/forum', postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await API.put(`/forum/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await API.delete(`/forum/${id}`);
    return response.data;
  },

  likePost: async (id) => {
    const response = await API.post(`/forum/${id}/like`);
    return response.data;
  },

  addComment: async (id, content) => {
    const response = await API.post(`/forum/${id}/comments`, { content });
    return response.data;
  },

  deleteComment: async (postId, commentId) => {
    const response = await API.delete(`/forum/${postId}/comments/${commentId}`);
    return response.data;
  }
};

export default forumService;