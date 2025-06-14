import { useState } from 'react'; // Import useState Hook
import image_coreFeaturesTile from './assets/components.png'
import Header from './components/Header';
import CoreFeatures from './components/CoreFeatures'
// 🎓 LEARNING: Importing Feature Components
import RequestFeature from './components/RequestFeature';
import AppreciateFeature from './components/AppreciateFeature';
import RecommendFeature from './components/RecommendFeature';

function App() { //component
  // 🎓 LEARNING: useState Hook
  // useState returns an array with 2 items:
  // 1. Current state value (selectedFeature)
  // 2. Function to update state (setSelectedFeature)
  const [selectedFeature, setSelectedFeature] = useState(null);

  // 🎓 LEARNING: Event Handler Function
  // This function will be called when a CoreFeature is clicked
  function handleFeatureSelect(featureTitle) {
    console.log('Feature selected:', featureTitle); // Debug log
    setSelectedFeature(featureTitle);
  }

  // 🎓 LEARNING: Function to go back to main view
  function handleBackToFeatures() {
    setSelectedFeature(null);
  }

  // 🎓 LEARNING: Function to Render Correct Feature Component
  function renderFeatureContent() {
    switch(selectedFeature) {
      case 'REQUEST':
        return <RequestFeature />;
      case 'APPRECIATE':
        return <AppreciateFeature />;
      case 'RECOMMEND':
        return <RecommendFeature />;
      default:
        return <p>Feature not found</p>;
    }
  }

  return (
    <div>
      <Header /> 
      <main>
        {/* 🎓 LEARNING: Conditional Rendering */}
        {/* Show different content based on whether a feature is selected */}
        {!selectedFeature ? (
          // Show the main core features section
          <section id='core-features'>
            <h2>Core Features</h2>
            <ul>
              <CoreFeatures 
                title='REQUEST' 
                description='Request the artist or content you wish to see' 
                img={image_coreFeaturesTile}
                onSelect={handleFeatureSelect} 
              />
              <CoreFeatures 
                title='APPRECIATE' 
                description='Appreciate a unsung artist' 
                img={image_coreFeaturesTile}
                onSelect={handleFeatureSelect}
              />
              <CoreFeatures 
                title='RECOMMEND' 
                description='Recommend other to watch a content' 
                img={image_coreFeaturesTile}
                onSelect={handleFeatureSelect}
              />
            </ul>
          </section>
        ) : (
          // Show the selected feature section (vertical rectangle)
          <section id='selected-feature' className='feature-detail'>
            <div className='feature-detail-container'>
              <button onClick={handleBackToFeatures} className='back-button'>
                ← Back to Features
              </button>
              <h2>{selectedFeature}</h2>
              {/* 🎓 LEARNING: Render Different Components Based on Selection */}
              {renderFeatureContent()}
            </div>
          </section>
        )}
        
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
