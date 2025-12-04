const ForumPost = require('../models/ForumPost');
const User = require('../models/User');

// @desc    Get all posts
// @route   GET /api/forum
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const { category, tags, search } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await ForumPost.find(filter)
      .populate('authorId', 'name establishment')
      .populate('comments.authorId', 'name')
      .sort({ isPinned: -1, createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des posts'
    });
  }
};

// @desc    Get post by ID
// @route   GET /api/forum/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('authorId', 'name establishment role')
      .populate('comments.authorId', 'name role');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du post'
    });
  }
};

// @desc    Create post
// @route   POST /api/forum
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, metrics } = req.body;
    
    const post = await ForumPost.create({
      authorId: req.user.id,
      title,
      content,
      category,
      tags,
      metrics
    });
    
    // Ajouter des points à l'utilisateur
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'gamification.points': 30 }
    });
    
    const populatedPost = await ForumPost.findById(post._id)
      .populate('authorId', 'name establishment');
    
    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du post',
      error: error.message
    });
  }
};

// @desc    Update post
// @route   PUT /api/forum/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    let post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    // Vérifier que c'est l'auteur
    if (post.authorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }
    
    post = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('authorId', 'name establishment');
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du post'
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/forum/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    // Vérifier que c'est l'auteur
    if (post.authorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: 'Post supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du post'
    });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/forum/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    // Vérifier si déjà liké
    const alreadyLiked = post.likes.includes(req.user.id);
    
    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      // Like
      post.likes.push(req.user.id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      data: {
        likes: post.likes.length,
        isLiked: !alreadyLiked
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du like'
    });
  }
};

// @desc    Add comment
// @route   POST /api/forum/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    const comment = {
      authorId: req.user.id,
      content: req.body.content
    };
    
    post.comments.push(comment);
    await post.save();
    
    // Ajouter des points
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'gamification.points': 10 }
    });
    
    const updatedPost = await ForumPost.findById(post._id)
      .populate('comments.authorId', 'name role');
    
    res.status(201).json({
      success: true,
      data: updatedPost.comments[updatedPost.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du commentaire'
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/forum/:postId/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post non trouvé'
      });
    }
    
    const comment = post.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Commentaire non trouvé'
      });
    }
    
    // Vérifier que c'est l'auteur
    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé'
      });
    }
    
    comment.deleteOne();
    await post.save();
    
    res.json({
      success: true,
      message: 'Commentaire supprimé'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du commentaire'
    });
  }
};