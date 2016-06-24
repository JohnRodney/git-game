import React from 'react';
import Repos from '../../../imports/collections/repos';
import Repo from './Repo'
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class GitComponent extends React.Component {
  constructor() {
    super();
    this.filterResults = this.filterResults.bind(this);
    this.state = { search: '' };
  }

  filterResults(e) {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const { repos } = this.props;

    if (repos.length === 0) {
      return (
        <div className='loading'>
          Searching for the meaning of life
        </div>
      );
    }

    return (
      <div>
        <div className='search-bar'>
          <div className='search-icon'></div>
          <input onChange={this.filterResults} type='text'></input>
        </div>
        <div className='repos'>
          {
            repos.filter((repo) => {
              return repo.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
            }).map((repo, i) => {
              return <Repo key={`repo-${i}`} repo={repo} />
            })
          }
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  const repos = Repos.find().fetch();

  repos.sort((repoA, repoB) => {
    return repoA.open_issues > repoB.open_issues ? -1 : 1;
  });

  return {
    repos,
    ...props
  }
}, GitComponent);
