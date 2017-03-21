import React, { Component } from 'react';

class ShortURLInfo extends Component {
  hrefParse(url) {
    let parsed = url;
    if (url.indexOf('http://') <= 0 && url.indexOf('https://') <= 0) {
      parsed = `http://${url}`;
    }
    console.log(parsed);
    return parsed;
  }

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
            <a href={this.hrefParse(url)} className="is-large" target="_blank">
              {url}
            </a>
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
