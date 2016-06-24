import { Meteor } from 'meteor/meteor';
import Repos from './repos';

Meteor.methods({
  addRepo(repo) {
    Repos.insert(repo);
  },

  clearIssue(repo, issue, value) {
    const user = Meteor.users.findOne(Meteor.user()._id);
    const score = isNaN(user.profile.score) ? 0 : user.profile.score;
    const open_issues = repo.open_issues;
    Repos.update({ '_id': repo._id }, { '$pull': { 'issues' : issue } });
    Repos.update({ '_id': repo._id }, { '$set': { 'open_issues' : open_issues - 1 } });
    Meteor.users.update(Meteor.user()._id, { '$set': { 'profile.score': score + value }});
  }
});

Meteor.publish('Repos', function publishRepos() {
  return Repos.find();
});
