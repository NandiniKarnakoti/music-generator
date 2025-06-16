import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API || 'http://localhost:4000';

function App() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchMusic = async () => {
    try {
      const res = await axios.get(`${API}/api/music`);
      setMusicList(res.data);
    } catch (err) {
      setMsg('Error fetching music');
    }
  };

  const handleAdd = async () => {
    if (!title || !url) return setMsg('Title and URL required');
    try {
      await axios.post(`${API}/api/music`, { title, url });
      setTitle('');
      setUrl('');
      fetchMusic();
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error adding music');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/music/${id}`);
      fetchMusic();
    } catch (err) {
      setMsg('Error deleting music');
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div style={{ padding: '2em' }}>
      <h2> Music Generator Manager</h2>
      <input
        placeholder="Music Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="Music URL (e.g. link to mp3)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br /><br />
      <button onClick={handleAdd}>Add Music</button>
      <p>{msg}</p>

      <ul>
        {musicList.map(music => (
          <li key={music._id}>
            <strong>{music.title}</strong> - <a href={music.url} target="_blank" rel="noreferrer">Play</a>
            &nbsp; <button onClick={() => handleDelete(music._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
