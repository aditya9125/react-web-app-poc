
import image_coreFeaturesTile from './assets/components.png'
import Header from './components/Header';
import CoreFeatures from './components/CoreFeatures'

function App() { //component
  return (
    <div>
      <Header /> 
      <main>
        <section id='core-concepts'>
          <h2>Core Features</h2>
          <ul>
            <CoreFeatures title='REQUEST' description='Request the artist or content you wish to see' img={image_coreFeaturesTile} />
            <CoreFeatures title='APPRECIATE' description='Appreciate a unsung artist' img={image_coreFeaturesTile} />
            <CoreFeatures title='RECOMMEND' description='Recommend other to watch a content' img={image_coreFeaturesTile} />
          </ul>

        </section>
        <h2>Time to get started!</h2>

      </main>
    </div>
  );
}

export default App;
