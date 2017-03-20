import React, { Component } from 'react';

class ShortURLInfo extends Component {
  render() {
    return (
      <section className="section">
        <div className="has-text-centered">
          <div>
            <p className="heading">link</p>
            <p className="title">
              {'http://www.google.com/really/long/url/over/the/top/blah/balha.json'}
            </p>
          </div>
        </div>
        <section className="section level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Shortened</p>
              <p className="title">
                {'http://pili.surge.sh/fEFdsa23'}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">visits</p>
              <p className="title">789</p>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default ShortURLInfo;
