import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class AppBar extends React.Component {
  render() {
    const { user } = this.props;
    let userContent = '';

    if (user) {
      userContent = (
        <div>
          <div className='currency'>
           {Meteor.user() ? Meteor.user().profile.score : 0} <span className='issue-coin'></span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>
          <span className='git'>git</span>
          <span className='game'>Game</span>
        </h1>
        <div className='logout' onClick={() => {
          Meteor.logout();
        }}>
          Logout
        </div>
        {userContent}
      </div>
    )
  }
}

const AppBarWithData = createContainer((props) => {
  user = Meteor.user();

  return {
    user,
    ...props
  }
}, AppBar);


export default AppBarWithData;
