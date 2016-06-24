import React from 'react';
import { Meteor } from 'meteor/meteor';
import Login from './Login.jsx';
import GitComponent from './GitComponent';
import { createContainer } from 'meteor/react-meteor-data';

class AppBody extends React.Component {
  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div>
          <GitComponent />
        </div>
      )
    }
    return (
      <div>
        <div className='login-container'>
          <Login />
        </div>
      </div>
    );
  }
}

const AppBodyWithData = createContainer((props) => {
  user = Meteor.user();

  return {
    user,
    ...props
  }
}, AppBody);


export default AppBodyWithData;
