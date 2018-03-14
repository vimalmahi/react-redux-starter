import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/navbar/Navbar';
import AppSidebar from './components/sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar></AppNavbar>
        <div className="container-fluid ">
          <div className="row">
            <AppSidebar></AppSidebar>
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
              App Container
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
