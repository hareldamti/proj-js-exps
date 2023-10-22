import './App.css';
import Card from './compoments/Card.js'
import Particles from './experiments/Particles';
import Sphere from './experiments/Sphere';
import Wormhole from './experiments/Wormhole';
import Shapes from './experiments/Shapes';
import Complex from './experiments/Complex';

function App() {
  return (
    <div className="App">
      <div className="cards-list">
        <Card experiment={Particles}/>
        <Card experiment={Sphere}/>
        <Card experiment={Wormhole}/>
        <Card experiment={Shapes}/>
        <Card experiment={Complex}/>
      </div>
    </div>
  );
}

export default App;
