import React, { Component } from 'react';

class ShortURLInfo extends Component {
  render() {
    const {
      shortCode,
      url,
      visits,
    } = Object.assign({}, {
      shortCode: '',
      url: '',
      owner: '',
      visits: 0,
      lastVisited: '',
    }, this.props);
    return (
      <div className="box is-primary is-outlined">
        <div className="has-text-centered">
          <div>
            <p className="heading">link</p>
            <p className="title">
              {url}
            </p>
          </div>
        </div>
        <hr />
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Shortened</p>
              <p className="title">
                {`pili.com/${shortCode}`}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">visits</p>
              <p className="title">{visits}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortURLInfo;
