import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router';

const tapLogObject = function tapLogObject(obj) {
  console.log(obj);
  return obj;
};

const hostname = () => window.location.hostname;
const SHORT_CODE_LENGTH = 9;
const SHORTENED_LENGTH = hostname().length + SHORT_CODE_LENGTH + 1;
const urlRegex = /^(https?:\/\/)[^.]+(\.[^.]+)+$/i;

class ShortenForm extends Component {
  constructor() {
    super();
    this.state = {
      validURL: false,
      url: '',
    };
  }

  validType(url) {
    return typeof url === 'string';
  }

  validLength(url) {
    return url.length > SHORTENED_LENGTH;
  }

  validPattern(url) {
    const matches = urlRegex.exec(url);
    urlRegex.lastIndex = 0;

    return matches ? true : false;
  }

  isValidURL(url) {
    if (!this.validType(url)) {
      return {
        validURL: false,
        msg: 'Please, write a long URL for us to shorten',
      };
    }
    if (!this.validPattern(url)) {
      return {
        validURL: false,
        msg: `That is not a URL, please make sure it contains http:// https:// or whatever other protocol at the beginning.`,
      };
    }
    if (!this.validLength(url)) {
      return {
        validURL: false,
        msg: `That URL is already shorter than what we can give you (${SHORTENED_LENGTH} letters/symbols long).`,
      };
    }
    return { validURL: true, msg: "Hit 'Enter' or click 'shorten' button to get a shorter URL." };
  }

  updateText(event) {
    const val = event.target.value;
    this.setState({
      url: val,
      ...this.isValidURL(val),
    });
  }

  create(e) {
    e.preventDefault();
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
    let buttonClasses = 'button is-fullwidth is-large is-outlined is-danger is-disabled';
    let msgClasses = 'help has-text-centered is-danger';
    let urlIcon = 'fa fa-thumbs-down';
    if (validURL) {
      buttonClasses = 'button is-fullwidth is-large is-outlined is-danger';
      urlIcon = 'fa fa-check';
      msgClasses = 'help has-text-centered is-success';
    }
    return (
      <section className="section">
        <form onSubmit={this.create.bind(this)}>
          <div className="columns">
            <div className="column field is-half is-offset-one-quarter">
              <label className="label title">Pili-fy your URL</label>
              <div className="control has-icon has-icon-right">
                <input
                  className="input is-large is-danger"
                  type="url"
                  placeholder="http://your-long-url.com/goes/here"
                  pattern="https?://.+\..+"
                  required={true}
                  onChange={this.updateText.bind(this)}
                  />
                <span className="icon is-large">
                  <i className={urlIcon}></i>
                </span>
                <p className={msgClasses}>{this.state.msg || ''}</p>
              </div>
            </div>
          </div>
          <div className="columns ">
            <div className="column field is-half is-offset-one-quarter">
              <p className="control">
                <button
                  type="submit"
                  className={buttonClasses}
                  >Shorten</button>
              </p>
            </div>
          </div>
        </form>
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
