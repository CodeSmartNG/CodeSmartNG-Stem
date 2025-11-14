
import React, { useState } from 'react';
import './DiscussionForum.css';

const DiscussionForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Welcome to the Discussion Forum!',
      content: 'This is where you can ask questions and share ideas with other students.',
      author: 'Admin',
      date: '2024-01-15',
      category: 'announcements',
      tags: ['welcome', 'introduction'],
      replies: [
        { id: 1, author: 'Student1', content: 'Great platform!', date: '2024-01-16' }
      ]
    },
    {
      id: 2,
      title: 'Help with React Components',
      content: 'I need help understanding how to pass props between components. Any examples?',
      author: 'Student2',
      date: '2024-01-16',
      category: 'technical-help',
      tags: ['react', 'javascript', 'components'],
      replies: []
    }
  ]);

  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    category: '', 
    tags: [] 
  });
  const [tagInput, setTagInput] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories configuration
  const categories = [
    { id: 'all', name: 'All Discussions', color: '#6c757d' },
    { id: 'announcements', name: 'Announcements', color: '#dc3545' },
    { id: 'technical-help', name: 'Technical Help', color: '#0d6efd' },
    { id: 'course-content', name: 'Course Content', color: '#198754' },
    { id: 'project-ideas', name: 'Project Ideas', color: '#6f42c1' },
    { id: 'career-advice', name: 'Career Advice', color: '#fd7e14' },
    { id: 'general', name: 'General Discussion', color: '#20c997' }
  ];

  // Common tags
  const commonTags = ['react', 'javascript', 'html', 'css', 'python', 'web-development', 'beginners', 'advanced'];

  const createPost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: 'Current User',
        date: new Date().toISOString().split('T')[0],
        category: newPost.category,
        tags: newPost.tags,
        replies: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', category: '', tags: [] });
      setShowNewPostForm(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim().toLowerCase())) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, tagInput.trim().toLowerCase()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addReply = (postId, replyContent) => {
    if (replyContent.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newReply = {
            id: post.replies.length + 1,
            author: 'Current User',
            content: replyContent,
            date: new Date().toISOString().split('T')[0]
          };
          return { ...post, replies: [...post.replies, newReply] };
        }
        return post;
      }));
    }
  };

  // Filter posts based on selected category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'General';
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6c757d';
  };

  return (
    <div className="discussion-forum">
      <div className="forum-header">
        <h3>Discussion Forum</h3>
        <p>Ask questions, share ideas, and collaborate with other students</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          + New Discussion
        </button>
      </div>

      {/* Categories Filter */}
      <div className="categories-filter">
        <h3>Categories</h3>
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="new-post-form">
          <h3>Create New Discussion</h3>
          <input
            type="text"
            placeholder="Discussion Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="form-input"
          />
          
          <select
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="What would you like to discuss?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="form-textarea"
            rows="4"
          />

          {/* Tags Input */}
          <div className="tags-section">
            <label>Tags (help others find your post)</label>
            <div className="tags-input-container">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="tag-input"
              />
              <button type="button" onClick={addTag} className="btn btn-sm">
                Add
              </button>
            </div>
            
            {/* Common Tags */}
            <div className="common-tags">
              <span>Common tags: </span>
              {commonTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className="tag-suggestion"
                  onClick={() => {
                    if (!newPost.tags.includes(tag)) {
                      setNewPost({ ...newPost, tags: [...newPost.tags, tag] });
                    }
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Selected Tags */}
            <div className="selected-tags">
              {newPost.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button onClick={createPost} className="btn btn-primary" disabled={!newPost.category}>
              Post Discussion
            </button>
            <button 
              onClick={() => setShowNewPostForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts Count */}
      <div className="posts-count">
        {filteredPosts.length} {filteredPosts.length === 1 ? 'discussion' : 'discussions'} 
        {selectedCategory !== 'all' && ` in ${getCategoryName(selectedCategory)}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-category">
                <span 
                  className="category-badge"
                  style={{ backgroundColor: getCategoryColor(post.category) }}
                >
                  {getCategoryName(post.category)}
                </span>
              </div>
              <h3 onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}>
                {post.title}
              </h3>
              <div className="post-meta">
                <span className="author">By {post.author}</span>
                <span className="date">{post.date}</span>
                <span className="replies-count">{post.replies.length} replies</span>
              </div>
            </div>
            
            <p className="post-content">{post.content}</p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="tag"
                    onClick={() => setSearchTerm(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Replies Section */}
            {selectedPost?.id === post.id && (
              <div className="replies-section">
                <div className="replies-list">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="reply">
                      <div className="reply-header">
                        <strong>{reply.author}</strong>
                        <span className="reply-date">{reply.date}</span>
                      </div>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                </div>
                
                {/* Add Reply Form */}
                <AddReplyForm postId={post.id} onAddReply={addReply} />
              </div>
            )}

            <div className="post-actions">
              <button 
                onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}
                className="btn btn-link"
              >
                {selectedPost?.id === post.id ? 'Hide Replies' : 'Show Replies'}
              </button>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <h3>No discussions found</h3>
            <p>Try selecting a different category or search term, or start a new discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add Reply Component (same as before)
const AddReplyForm = ({ postId, onAddReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = () => {
    if (replyContent.trim()) {
      onAddReply(postId, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="add-reply-form">
      <textarea
        placeholder="Write your reply..."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        className="form-textarea"
        rows="3"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        Post Reply
      </button>
    </div>
  );
};

export default DiscussionForum;