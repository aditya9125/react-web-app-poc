import { useState } from 'react';

// 🎓 LEARNING: Component for APPRECIATE Feature
export default function AppreciateFeature() {
  // 🎓 LEARNING: Multiple State Variables for Form Data
  const [artistName, setArtistName] = useState('');
  const [workName, setWorkName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    
    console.log('APPRECIATE submitted:', {
      artistName,
      workName
    });
    
    alert(`Appreciation submitted!\nArtist: ${artistName}\nWork: ${workName}`);
    
    // Reset form
    setArtistName('');
    setWorkName('');
  }

  return (
    <div className="feature-form">
      <h3>Appreciate an Artist</h3>
      <p>Show your appreciation for an unsung artist and their work!</p>
      
      <form onSubmit={handleSubmit} className="appreciate-form">
        <div className="form-group">
          <label htmlFor="artist-name">Artist Name:</label>
          <input
            type="text"
            id="artist-name"
            name="artist-name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Enter artist name..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="work-name">Work Name:</label>
          <input
            type="text"
            id="work-name"
            name="work-name"
            value={workName}
            onChange={(e) => setWorkName(e.target.value)}
            placeholder="Enter work/project name..."
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Appreciation
        </button>
      </form>
    </div>
  );
} 