import React, { Component } from 'react';
import {
  Link,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

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
      <Router>
        <div className="App">
          <Header dropdown={this.dropdown.bind(this)} activeMenu={this.state.activeMenu}/>
          <Route exact path="/" component={ShortenForm} />
          <Route exact path="/data" render={() => (
            <Redirect to="/data/public/"/>
          )}/>
          <Route exact path="/data/:owner" component={ShortURLInfo} />
          <Route exact path="/data/:owner/:shortCode" component={ShortURLInfo} />
          <Route exact path="/:shortCode" render={({match}) => (
            <p>Visit what matches {match.params.shortCode}</p>
          )} />
        </div>
      </Router>
    );
  }
}

const Header = (props) => (
  <div className="hero is-small is-black is-bold">
    <div className="hero-head">
      <header className="nav">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
          </div>
          <span className="nav-toggle" onClick={props.dropdown}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div
            className={
              `nav-right nav-menu ${props.activeMenu ? 'is-active': ''}`
            }>
            <Link to="/data/public" className="nav-item is-active">
              All public links
            </Link>
            <span className="nav-item">
              <a
                href="https://github.com/betoesquivel/pili_frontend"
                className="button is-primary is-inverted">
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
);

export default App;
