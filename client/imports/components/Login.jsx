import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  render() {
    return (
      <div className='login-container'>

        <div className='github-icon'></div>
        <button className='login-button' onClick={() => {
          Meteor.loginWithGithub({
            requestPermissions : ['repo'],
          })
        }}>Login
        </button>
      </div>
    );
  }
}
