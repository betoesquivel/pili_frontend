import React, { Component } from 'react';

class ShortenForm extends Component {
  constructor() {
    super();
    this.state = {
      validURL: false,
    };
  }

  isValidURL(url) {
    return true;
  }

  updateText(event) {
    const val = event.target.value;
    this.setState({ validURL: this.isValidURL(val) });
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
        <a className={buttonClasses}>Shorten</a>
      </section>
    );
  }
}

export default ShortenForm;
