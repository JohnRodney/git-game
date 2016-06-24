import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

const clientId = '594d9f9f283c1dffb98c';
const secret = 'ec76fb9135ac6eb3e5adc66c837655ff6ae74f7a';
const creds = `client_id=${clientId}&client_secret=${secret}`;
const options = {
  headers: {
    'User-Agent': 'JohnRodney',
  },
};

function handleResponse(error, nextResponse) {
  if (!error) {
    nextResponse.data.forEach((repo) => {
      HTTP.get(`${repo.issues_url.replace(/{.*}/, '')}?${creds}&state=open`,
      options, (err, data) => {
        const insertRepo = repo;
        insertRepo.issues = data.data;
        Meteor.call('addRepo', insertRepo);
      });
    });
  }
}

export default function () {
  const baseUrl = `https://api.github.com/orgs/poetic/repos?client_id=${clientId}&client_secret=${secret}&per_page=100`;
  let maxPages = 1;
  HTTP.get(baseUrl, options, (err, response) => {
    response.headers.link.replace(/<.*page/, '').split('')
      .forEach((entry) => {
        if (!isNaN(entry) && entry !== ' ') { maxPages = entry; }
      });

    for (let i = 1; i <= maxPages; i++) {
      HTTP.get(`${baseUrl}&page=${i}`, options, handleResponse);
    }
  });
}
