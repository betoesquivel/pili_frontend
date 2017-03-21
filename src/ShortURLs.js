import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import ShortURLInfo from './ShortURLInfo';

class ShortURLs extends Component {
  render() {
    const items = this.props.data.shortURLs;
    return (
      <div>
        {typeof items !== 'undefined' ?
          <section className="shortURL-list section">
            {items.map((item, i) => (
              <ShortURLInfo key={i} {...item} hrefParse={this.props.hrefParse}/>
            ))}
          </section> : ''}
      </div>
    );
  }
}
const query = gql`
query urls($short: ShortKeyQueryInput!){
	shortURLs(shortKey: $short){
    id
    shortCode
    url
    owner
    visits
    lastVisited
  }
}
`;
//const withQuery = graphql(query, {
  //pollInterval: 200,
const withQuery = graphql(query)(ShortURLs);
export default withQuery;
