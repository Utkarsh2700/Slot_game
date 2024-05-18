import React from 'react';
import Slot from './components/Slot';
import './App.css';

const config = {
  inverted: false,
  onSpinStart: (symbols) => {
    console.log('onSpinStart', symbols);
  },
  onSpinEnd: (symbols) => {
    console.log('onSpinEnd', symbols);
  },
};

function App() {
  return (
    <div className="App">
      hello
      <Slot config={config} />
    </div>
  );
}

export default App;
