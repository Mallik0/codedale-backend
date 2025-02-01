import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMTIzIiwiaWF0IjoxNzM4Mzk3NTY4LCJleHAiOjE3Mzg0MDExNjh9.nH5bvAZKtNBC7bEDNI4sMYIGZnmgVTFB1GdCD94LlvY'; 

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setUser(userResponse.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      }

      try {
        const postsResponse = await axios.get(`${API_BASE_URL}/posts/user123`, {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setPosts(postsResponse.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts');
      }

      try {
        const pollResponse = await axios.get(`${API_BASE_URL}/polls/poll1`, {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setPoll(pollResponse.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch poll data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user && <p>Welcome, {user.name} ({user.email})</p>}
      
      <h2 className="text-lg font-semibold mt-4">Your Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content} - Likes: {post.likes}</li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Poll Details</h2>
      {poll && (
        <div>
          <p>Question: {poll.question}</p>
          <p>Options: {poll.options.join(', ')}</p>
          <h3>Responses:</h3>
          <ul>
            {poll.responses.map((resp, index) => (
              <li key={index}>{resp.userName} selected {resp.option}</li> 
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
