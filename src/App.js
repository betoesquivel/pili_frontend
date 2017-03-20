import React, { Component } from 'react';
import logo from './pililogo.svg';
import './App.css';

import ShortURLInfo from './ShortURLInfo';
import ShortenForm from './ShortenForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeMenu: false,
    };
  }

  dropdown() {
    this.setState({activeMenu: !this.state.activeMenu});
  }

  render() {
    return (
      <div className="App">
        <div className="hero is-medium is-black is-bold">
          <div className="hero-head">
            <header className="nav">
              <div className="container">
                <div className="nav-left">
                  <a className="nav-item">
                    <img src={logo} className="App-logo" alt="logo" />
                  </a>
                </div>
                <span className="nav-toggle" onClick={this.dropdown.bind(this)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div
                  className={
                    `nav-right nav-menu ${this.state.activeMenu ? 'is-active': ''}`
                  }>
                  <a className="nav-item is-active">
                    Home
                  </a>
                  <a className="nav-item">
                    Examples
                  </a>
                  <a className="nav-item">
                    Documentation
                  </a>
                  <span className="nav-item">
                    <a className="button is-primary is-inverted">
                      <span className="icon">
                        <i className="fa fa-github"></i>
                      </span>
                      <span>Download</span>
                    </a>
                  </span>
                </div>
              </div>
            </header>
          </div>
          <div className="hero-body">
            <h2 className="title">Shorten URLs with Pili</h2>
          </div>
        </div>
        <ShortenForm />
        <ShortURLInfo />
      </div>
    );
  }
}

export default App;
