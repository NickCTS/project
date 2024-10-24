import React, { useState, useEffect } from 'react';  // Import useState and useEffect
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}/comments`}>View Comments</Link>
          <Link to={`/posts/${post.id}/new-comment`}>Add Comment</Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
