import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router';

const tapLogObject = function tapLogObject(obj) {
  console.log(obj);
  return obj;
};

class ShortenForm extends Component {
  constructor() {
    super();
    this.state = {
      validURL: false,
      url: '',
    };
  }

  isValidURL(url) {
    return true;
  }

  updateText(event) {
    const val = event.target.value;
    this.setState({
      url: val,
      validURL: this.isValidURL(val),
    });
  }

  onClick() {
    this.props.shorten({
      variables: {
        short: {
          url: this.state.url,
        }
      }
    })
    .then(tapLogObject)
    .then(({
      data: {createShortURL: {shortCode}}
    }) => tapLogObject(shortCode))
    .then(code => this.props.history.push(`/data/public/${code}`));
  }

  render() {
    const { validURL } = this.state;
    let buttonClasses = 'button is-large is-outlined is-danger is-disabled';
    let urlIcon = 'fa fa-thumbs-down';
    if (validURL) {
      buttonClasses = 'button is-large is-outlined is-danger';
      urlIcon = 'fa fa-check';
    }
    return (
      <section className="section">
        <div className="field">
          <label className="label title">Pili-fy your URL</label>
          <p className="control has-icon has-icon-right">
            <input
              className="input is-large is-danger"
              type="url"
              placeholder="http://your-long-url.com/goes/here"
              pattern="https?://.+"
              required={true}
              onChange={this.updateText.bind(this)}
              />
            <span className="icon is-small">
              <i className={urlIcon}></i>
            </span>
          </p>
        </div>
        <a
          className={buttonClasses}
          onClick={this.onClick.bind(this)}>Shorten</a>
      </section>
    );
  }
}

const createShortURL = gql`
mutation shorten($short: NewShortURLInput!){
	createShortURL(newShort: $short){
    id
    shortCode
    url
    owner
    visits
    lastVisited
  }
}
`;
const withMutation = graphql(createShortURL, {name: 'shorten'})(ShortenForm);
const withMutationAndRouter = withRouter(withMutation)
export default withMutationAndRouter;
