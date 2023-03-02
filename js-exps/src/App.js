import './App.css';
import Card from './compoments/Card.js'
import Particles from './experiments/Particles';
function App() {
  return (
    <div className="App">
      <div className="cards-list">
        <Card experiment={Particles}/>
      </div>
    </div>
  );
}

export default App;
