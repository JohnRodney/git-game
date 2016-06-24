import React from 'react';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import randomPhrase from '../../../imports/modules/random-phrase';

export default class Repo extends React.Component {
  constructor() {
    super();
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.closeIssue = this.closeIssue.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = { open: false, celebrate: false };
  }

  getValue(issue) {
    const today = moment();
    const issueDate = moment(issue.created_at);
    return Math.abs(issueDate.diff(today, 'days')) * 10 + 50;
  }

  toggleDropDown() {
    this.setState({
      open: !this.state.open,
    });
  }

  celebrate() {
    this.setState({ celebrate: true });
    setTimeout(() => this.backToWork(), 3000);
  }

  backToWork() {
    this.setState({ celebrate: false });
  }

  closeIssue(issue) {
    const { repo } = this.props;
    const value = this.getValue(issue);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `token ${Meteor.user().services.github.accessToken}`,
    };

    $.ajax({
      headers,
      type: 'PATCH',
      url: `${issue.url}?access_token=${Meteor.user().services.github.accessToken}`,
      contentType: 'json',
      dataType: 'json',
      data: JSON.stringify({
        state: 'closed',
      }),
    })
    .done(() => {
      Meteor.call('clearIssue', repo, issue, value);
      this.celebrate();
      $.ajax({
        type: 'POST',
        url: 'https://hooks.slack.com/services/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',
        dataType: 'json',
        data: JSON.stringify({
          text: `${randomPhrase(value)}`,
        }),
      });
    });
  }

  submitMessage(issue) {
    const title = issue.title.replace(/ /g, '').replace(/'/g, '').replace(/./g, '');
    const message = $(`#issue-${title} > .issue-actions > textarea`).val();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `token ${Meteor.user().services.github.accessToken}`,
    };

    $.ajax({
      headers,
      type: 'POST',
      url: `${issue.url}/comments?access_token=${Meteor.user().services.github.accessToken}`,
      contentType: 'json',
      dataType: 'json',
      data: JSON.stringify({
        body: message,
      }),
    })
    .done(() => {

    });
  }

  render() {
    const { repo } = this.props;

    let hiddenContent = '';
    if (repo.open_issues === 0) { return null; }
    if (this.state.open) {
      hiddenContent = this.props.repo.issues.map((issue) => (
        <div
          className="issue"
          id={`issue-${issue.title.replace(/ /g, '').replace(/'/g, '').replace(/./g, '')}`}
          key={`issue-${issue.title}`}
        >
          <div className="issue-title">
            <h2>{issue.title}</h2>
          </div>
          <div className="issue-body">
            <ReactMarkdown source={issue.body} />
          </div>
          <div className="issue-value">
            Bounty: {this.getValue(issue)}
          </div>
          <div className="issue-coin"></div>
          <br />
          <div className="issue-actions">
            <h3>Send a Message:</h3>
            <textarea rows="4" cols="50">
            </textarea>
            <br />
            <button onClick={() => { this.submitMessage(issue); }}>SEND</button>
            <button onClick={() => { this.closeIssue(issue); }}>CLOSE</button>
            <button
              onClick={() => {
                this.submitMessage(issue);
                this.closeIssue(issue);
              }}
            >
              BOTH
            </button>
          </div>
        </div>
      ));
    }

    const toggleValue = this.state.celebrate ? 'show' : 'hide';
    const celebrate = <div className={`celebrate ${toggleValue}`}></div>;
    return (
      <div>
        <div onClick={this.toggleDropDown} className="repo">
          <span className={`drop-down ${this.state.open ? 'open' : 'closed'}`}></span>
          {repo.name}
          <span className="open-issues">{repo.open_issues}</span>
          <br />
        </div>
        {celebrate}
        {hiddenContent}
      </div>
    );
  }
}

Repo.propTypes = {
  repo: React.PropTypes.object,
};
