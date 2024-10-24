import { useEffect, useState } from 'react';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  return (
    <div>
      <h1>Tags</h1>
      {tags.map(tag => (
        <div key={tag.id}>
          <p>{tag.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
