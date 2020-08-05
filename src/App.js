import React from 'react';
import './App.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

const API = 'https://api.github.com/users';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'jchicano',
      name: '',
      avatar: '',
      location: '',
      repos: '',
      followers: '',
      following: '',
      homeUrl: '',
      notFound: '',
    };
  }
  fetchProfile(username) {
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          company: data.company,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message,
        });
      })
      .catch((error) => console.log('Oops! . There Is A Problem'));
  }
  componentDidMount() {
    this.fetchProfile(this.state.username);
  }
  render() {
    return (
      <div>
        <section id="card">
          <SearchProfile fetchProfile={this.fetchProfile.bind(this)} />
          <Profile data={this.state} />
        </section>
        <span className="bottom">
          Powered by <FaReact /> <a href="https://reactjs.com">React</a> &{' '}
          <FaGithub /> <a href="https://docs.github.com/en/rest">GitHub API</a>
        </span>
      </div>
      // https://codepen.io/theham3d/pen/wGzodM
    );
  }
}
class SearchProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="search-container">
        <form className="searchbox" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="search"
            placeholder="Type Username + Enter"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
      // https://codepen.io/menelaosly/pen/rZddyb
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.state.value;
    this.props.fetchProfile(username);
    this.setState({ value: '' });
  }
}

class Profile extends React.Component {
  render() {
    let data = this.props.data;
    let followers = `${data.homeUrl}?tab=followers`;
    let repositories = `${data.homeUrl}?tab=repositories`;
    let following = `${data.homeUrl}?tab=following`;
    if (data.notFound === 'Not Found')
      return (
        <div className="box-wrapper">
          <div className="box">
            <div className="box-inner">
              <h3 className="name">Oops!</h3>
              <h4 className="company">Username not found</h4>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="box-wrapper">
          <div className="box">
            <div className="avatar">
              <img src={data.avatar} alt={data.username} />
            </div>
            <div className="box-inner">
              <h3 className="name">{data.name || data.username}</h3>
              <h4 className="company">{data.company}</h4>
              <p className="location">
                <FaMapMarkerAlt /> {data.location || 'The Internet'}
              </p>
              <div className="profile-stats">
                <ul>
                  <li>
                    <a
                      href={followers}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Number Of Followers"
                    >
                      <i>{data.followers}</i>
                      <span>Followers</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={repositories}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Number Of Repositories"
                    >
                      <i>{data.repos}</i>
                      <span>Repositories</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={following}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Number Of Following"
                    >
                      <i>{data.following}</i>
                      <span>Following</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        // https://codepen.io/remtsoy/pen/ktJHD
      );
  }
}

export default App;
