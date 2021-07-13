import React from 'react';
import './App.css';
import States from './components/States';
import Cities from './components/Cities';

function App() {

  const [active, setActive] = React.useState('');

  return (
    <div className="App">
      <div className="menu">
        <button onClick={() => setActive('state')}>Cadastrar Estado</button>
        <button onClick={() => setActive('city')}>Cadastrar Cidade</button>
      </div>

      {active === 'state' && <States />}
      {active === 'city' && <Cities />}
    </div>
  );
}

export default App;
