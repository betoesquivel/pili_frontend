import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
            <a href={this.props.hrefParse(url)} className="is-large" target="_blank">
              {url}
            </a>
          </div>
        </div>
        <hr />
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Shortened</p>
              <Link to={`/${shortCode}`}>
                <p className="title">
                  {`pili.surge.sh/${shortCode}`}
                </p>
              </Link>
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
