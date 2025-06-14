import { useState } from 'react';

// 🎓 LEARNING: Component for APPRECIATE Feature
export default function AppreciateFeature() {
  // 🎓 LEARNING: Multiple State Variables for Form Data
  const [artistName, setArtistName] = useState('');
  const [workName, setWorkName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/appreciations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistName,
          workName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        console.log('Appreciation saved to database:', data.data);
        
        // Reset form
        setArtistName('');
        setWorkName('');
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('❌ Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="feature-form">
      <h3>Appreciate an Artist</h3>
      <p>Show your appreciation for an unsung artist and their work!</p>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Appreciation'}
        </button>
      </form>
    </div>
  );
} 