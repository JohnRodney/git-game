import React from 'react';
import { Meteor } from 'meteor/meteor';
import AppBody from './AppBody.jsx';
import AppBar from './AppBar.jsx';

export default function App() {
  return (
    <div>
      <div className='app-bar'>
        <AppBar />
      </div>
      <div className='app-body'>
        <AppBody />
      </div>
    </div>
  );
}
