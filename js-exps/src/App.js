import './App.css';
import Card from './compoments/Card.js'
import Particles from './experiments/Particles';
import Sphere from './experiments/Sphere';
function App() {
  return (
    <div className="App">
      <div className="cards-list">
        <Card experiment={Particles}/>
        <Card experiment={Sphere}/>
      </div>
    </div>
  );
}

export default App;
