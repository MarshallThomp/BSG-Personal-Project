import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import routes from './routes';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <HashRouter>
          <Header />
          
          {routes}
        </HashRouter>
      </div>
    )
  }
}

export default App;
