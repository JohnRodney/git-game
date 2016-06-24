import { Meteor } from 'meteor/meteor';

const adjectives = [
  'astronomic',
  'colossal',
  'considerable',
  'enormous',
  'epic',
  'gigantic',
  'ginormous',
  'humongous',
  'jumbo',
  'mammoth',
  'massive',
  'mega',
  'monster',
  'monumental',
  'prodigious',
  'sizeable',
  'tremendous',
  'vast',
  'very big',
  'very large',
  'whopping',
];

function randomAdjective() {
  return adjectives[Math.floor(Math.random() * adjectives.length)];
}

export default function randomPhrase(value) {
  const userName = Meteor.user().services.github.username;
  const score = Meteor.user().profile.score + value;
  return ([
    `${userName} has closed another ` +
    `${randomAdjective()} issue and now has ${score} points!`,
    `${userName} is making github great again! ` +
    `${score} points.`,
    `${userName} is feeling the bern! ` +
    `${score} points.`,
    `Another one bites the dust. ${userName} AKA: ` +
    `"Issue Assasin" strikes again for ${score} points`,
  ][Math.floor(Math.random() * 4)]);
}
