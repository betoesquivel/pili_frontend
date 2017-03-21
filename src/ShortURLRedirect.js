import React, { Component } from 'react';
import { withRouter } from 'react-router';
import sadCat from './sadcat.jpg';

const sleep = function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

class ShortURLRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    const { urlPromise } = props;
    urlPromise
      .then(url => this.setState({ url: url || 'Not found' }))
      .then(() => sleep(5000))
      .then(() => {
        if (this.state.url !== 'Not found') {
          window.open(this.state.url, '_blank')
        } else {
          props.history.push(`/`);
        }
      });
  }

  render() {
    const url = this.state.url;
    const loading = url.length <= 0;
    const found = !loading && url !== 'Not found';
    const notFound = !loading && url === 'Not found';
    return (
      <section className="section">
      { loading ?
        `Loading`: '' }
      { found ?
        `Redirecting to ${url}...`: '' }
      { notFound ?
        `We couldn't find that short URL :(
        Taking you back to our Home page...`: '' }
      { notFound ?
        <img src={sadCat} className="cat-apology" alt="sad cat" /> : '' }
      </section>
    );
  }
}

export default withRouter(ShortURLRedirect);
