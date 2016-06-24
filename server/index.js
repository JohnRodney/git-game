import '../imports/collections/repos-methods';
import Repos from '../imports/collections/repos';
import seed from './seed';
// import { Accounts } from 'meteor/accounts-base';

// Accounts.loginServiceConfiguration.insert({
//   service: 'github',
//   clientId: '594d9f9f283c1dffb98c',
//   secret: 'ec76fb9135ac6eb3e5adc66c837655ff6ae74f7a',
// });

Meteor.publish("users", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'profile': 1, 'services': 1}});
});

if (Repos.find().fetch().length === 0) {
  seed();
}
