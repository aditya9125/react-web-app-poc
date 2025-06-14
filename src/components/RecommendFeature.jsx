import { useState } from 'react';

// 🎓 LEARNING: Component with Multiple Form Fields
export default function RecommendFeature() {
  // 🎓 LEARNING: Managing Multiple Form States
  const [contentName, setContentName] = useState('');
  const [platformName, setPlatformName] = useState('');
  const [specificReason, setSpecificReason] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    
    console.log('RECOMMEND submitted:', {
      contentName,
      platformName,
      specificReason
    });
    
    alert(`Recommendation submitted!\nContent: ${contentName}\nPlatform: ${platformName}\nReason: ${specificReason}`);
    
    // Reset form
    setContentName('');
    setPlatformName('');
    setSpecificReason('');
  }

  return (
    <div className="feature-form">
      <h3>Recommend Content</h3>
      <p>Recommend content to others and tell them why they should watch it!</p>
      
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
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Recommendation
        </button>
      </form>
    </div>
  );
} 