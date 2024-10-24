import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { postId } = useParams();  // Get postId from URL
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [postId]);

  return (
    <div>
      <h1>Comments for Post {postId}</h1>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
