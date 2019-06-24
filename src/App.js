import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import routes from './routes';
import './App.css';

class App extends Component {
  constructor(){
    super()
  }
  
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
