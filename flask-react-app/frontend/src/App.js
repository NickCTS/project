import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import Posts from './components/Posts';
import TagForm from './components/TagForm';
import Tags from './components/Tags';
import CommentForm from './components/CommentForm';
import Comments from './components/Comments';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/new-post">New Post</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/new-tag">New Tag</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/new-post" element={<PostForm />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/new-tag" element={<TagForm />} />
          
          {/* Add route for comments under each post */}
          <Route path="/posts/:postId/comments" element={<Comments />} />
          <Route path="/posts/:postId/new-comment" element={<CommentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
