import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  Link,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import logo from './pililogo.svg';
import './App.css';

import ShortURLs from './ShortURLs';
import ShortenForm from './ShortenForm';

const tapLogObject = function tapLogObject(obj) {
  console.log(obj);
  return obj;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeMenu: false,
    };
  }

  hrefParse(url) {
    let parsed = url;
    if (url.indexOf('http://') <= 0 && url.indexOf('https://') <= 0) {
      parsed = `http://${url}`;
    }
    console.log(parsed);
    return parsed;
  }

  dropdown() {
    this.setState({activeMenu: !this.state.activeMenu});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header dropdown={this.dropdown.bind(this)} activeMenu={this.state.activeMenu}/>
          <Route exact path="/" render={({match}) => (
            <ShortenForm />
          )}/>
          <Route exact path="/data" render={() => (
            <Redirect to="/data/public/"/>
          )}/>
          <Route exact path="/data/:owner" render={({match}) => (
            <ShortURLs
              short={{...match.params}}
            />
          )} />
          <Route exact path="/data/:owner/:shortCode" render={({match}) => (
            <ShortURLs
              short={{...match.params}}
            />
          )} />
          <Route exact path="/:shortCode" render={({match}) => {
            this.props.visit({
              variables: {
                short: {
                  ...match.params,
                }
              }
            })
            .then(tapLogObject)
            .then(({
              data: {visitShortURL: {url}}
            }) => tapLogObject(url))
            .then(url => window.open(this.hrefParse(url), '_self'));
            return (
              <div className="card">
                Loading data...
                <div className="card-content is-loading">
                </div>
              </div>
            );
          }}/>
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
            <Link to="/" className="nav-item">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
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
      <h2 className="title">
        Pili means small in&nbsp;
        <a className="link" href="https://en.wikipedia.org/wiki/Nahuatl" target="_blank">
          <u>Nahuatl</u>
        </a>.
      </h2>
    </div>
  </div>
);


const visitShortURL = gql`
mutation visit($short: ShortKeyInput!){
	visitShortURL(shortKey: $short){
    url
  }
}
`;
const withMutation = graphql(visitShortURL, {name: 'visit'})(App);

export default withMutation;
