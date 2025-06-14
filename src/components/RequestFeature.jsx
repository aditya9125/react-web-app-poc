import { useState } from 'react';

// 🎓 LEARNING: Controlled Components
// React controls the input values through state
export default function RequestFeature() {
  // 🎓 LEARNING: Form State Management
  // We use state to track form input values
  const [artistName, setArtistName] = useState('');
  const [roleType, setRoleType] = useState('');

  // 🎓 LEARNING: Form Submission Handler
  function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    
    // Here you would typically send data to a server
    console.log('REQUEST submitted:', {
      artistName,
      roleType
    });
    
    // Show user feedback
    alert(`Request submitted!\nArtist: ${artistName}\nRole: ${roleType}`);
    
    // Reset form
    setArtistName('');
    setRoleType('');
  }

  return (
    <div className="feature-form">
      <h3>Request an Artist for a Role</h3>
      <p>Tell us which artist you'd like to see and in what type of role!</p>
      
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
          >
            <option value="">Select a role type...</option>
            <option value="Comedy Role">Comedy Role</option>
            <option value="Criminal Role">Criminal Role</option>
            <option value="Lead Role">Lead Role</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
} 