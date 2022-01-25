import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar.jsx'
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
