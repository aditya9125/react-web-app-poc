import { useState } from 'react';

// 🎓 LEARNING: Controlled Components
// React controls the input values through state
export default function RequestFeature() {
  // 🎓 LEARNING: Form State Management
  // We use state to track form input values
  const [artistName, setArtistName] = useState('');
  const [roleType, setRoleType] = useState('');
  // 🎓 LEARNING: Add Loading State for Better UX
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🎓 LEARNING: Async Function for API Call
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    
    setIsLoading(true);
    setMessage('');
    
    try {
      // 🎓 LEARNING: Making API Request to Backend
      const response = await fetch('http://localhost:3001/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistName,
          roleType
        })
      });

      // 🎓 LEARNING: Parse JSON Response
      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage(`✅ ${data.message}`);
        console.log('Request saved to database:', data.data);
        
        // Reset form on success
        setArtistName('');
        setRoleType('');
      } else {
        // Error from server
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      // 🎓 LEARNING: Network Error Handling
      console.error('Network error:', error);
      setMessage('❌ Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="feature-form">
      <h3>Request an Artist for a Role</h3>
      <p>Tell us which artist you'd like to see and in what type of role!</p>
      
      {/* 🎓 LEARNING: Show Messages to User */}
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="request-form">
        {/* 🎓 LEARNING: Controlled Text Input */}
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

        {/* 🎓 LEARNING: Controlled Select Dropdown */}
        <div className="form-group">
          <label htmlFor="role-type">Role Type:</label>
          <select
            id="role-type"
            name="role-type"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="">Select a role type...</option>
            <option value="Comedy Role">Comedy Role</option>
            <option value="Criminal Role">Criminal Role</option>
            <option value="Lead Role">Lead Role</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
} 