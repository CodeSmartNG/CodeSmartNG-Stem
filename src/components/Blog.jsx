import React from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of STEM Education",
      excerpt: "Exploring how technology is transforming the way we learn science and mathematics.",
      date: "March 15, 2024",
      author: "Aisha Bande",
      category: "Education"
    },
    {
      id: 2,
      title: "Getting Started with Python Programming",
      excerpt: "A beginner's guide to starting your programming journey with Python.",
      date: "March 10, 2024",
      author: "Kabir Alkasim",
      category: "Programming"
    },
    {
      id: 3,
      title: "The Importance of Early Coding Education",
      excerpt: "Why teaching children to code early can shape their problem-solving skills for life.",
      date: "March 5, 2024",
      author: "Auwal Ibrahim",
      category: "Education"
    }
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>CodeSmartNG Blog</h1>
        <p>Insights, tips, and news from the world of STEM education</p>
      </div>
      
      <div className="blog-posts">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-post">
            <div className="post-meta">
              <span className="post-category">{post.category}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-author">
              <span>By {post.author}</span>
            </div>
            <button className="read-more-btn">Read More</button>
          </article>
        ))}
      </div>
      
      <div className="blog-newsletter">
        <h3>Stay Updated</h3>
        <p>Subscribe to our newsletter for the latest blog posts and updates.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;