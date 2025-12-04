const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment
} = require('../controllers/forumController');
const { protect } = require('../middleware/auth');

router.get('/', getPosts);
router.get('/:id', getPostById);

router.use(protect);

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.post('/:id/comments', addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

module.exports = router;