import './App.css';
import Card from './compoments/Card.js'
import Particles from './experiments/Particles';
function App() {
  const card_list = [
    Card({experiment: Particles})
  ];
  return (
    <div className="App">
      <div className="cards-list">
        {card_list}
      </div>
    </div>
  );
}

export default App;
