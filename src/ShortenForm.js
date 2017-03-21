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

  onClick(e) {
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
    let urlIcon = 'fa fa-thumbs-down';
    if (validURL) {
      buttonClasses = 'button is-fullwidth is-large is-outlined is-danger';
      urlIcon = 'fa fa-check';
    }
    return (
      <section className="section">
        <form onSubmit={this.onClick.bind(this)}>
          <div className="columns">
            <div className="column field is-half is-offset-one-quarter">
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
