import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Board from './components/board/Board'

export default class App extends Component {
  
  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <Route exact path="/" component={Board}/>
            <Route path="/size/:size" component={Board}/>
          </div>
        </Router>
      </div>
    );
  }
}

