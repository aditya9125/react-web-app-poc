import { useState } from 'react';

// 🎓 LEARNING: Component with Multiple Form Fields
export default function RecommendFeature() {
  // 🎓 LEARNING: Managing Multiple Form States
  const [contentName, setContentName] = useState('');
  const [platformName, setPlatformName] = useState('');
  const [specificReason, setSpecificReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentName,
          platformName,
          specificReason
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        console.log('Recommendation saved to database:', data.data);
        
        // Reset form
        setContentName('');
        setPlatformName('');
        setSpecificReason('');
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
      <h3>Recommend Content</h3>
      <p>Recommend content to others and tell them why they should watch it!</p>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="recommend-form">
        <div className="form-group">
          <label htmlFor="content-name">Content Name:</label>
          <input
            type="text"
            id="content-name"
            name="content-name"
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            placeholder="Enter movie/show/content name..."
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform-name">Platform Name:</label>
          <input
            type="text"
            id="platform-name"
            name="platform-name"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            placeholder="Enter platform (Netflix, Amazon Prime, etc.)..."
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="specific-reason">Specific Reason:</label>
          <textarea
            id="specific-reason"
            name="specific-reason"
            value={specificReason}
            onChange={(e) => setSpecificReason(e.target.value)}
            placeholder="Why should others watch this content?..."
            rows="4"
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Recommendation'}
        </button>
      </form>
    </div>
  );
} 