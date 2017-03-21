import React, { Component } from 'react';
import { withRouter } from 'react-router';

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
      .then(() => sleep(2000))
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
    return (
      <section className="section">
      { url.length <= 0 ?
        `Loading`: '' }
      { url.length > 0  && url !== 'Not found'?
        `Redirecting to ${url}...`: '' }
      { url.length > 0  && url === 'Not found'?
        `We couldn't find that short URL :(
        Taking you back to our Home page...`: '' }
      </section>
    );
  }
}

export default withRouter(ShortURLRedirect);
