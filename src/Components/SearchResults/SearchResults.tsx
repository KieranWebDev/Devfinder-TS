import React from 'react';
// images
import locationImg from '../../images/icon-location.svg';
import companyImg from '../../images/icon-company.svg';
import blogImg from '../../images/icon-website.svg';
import twitterImg from '../../images/icon-twitter.svg';
// styles
import './SearchResults.css';

export default function SearchResults({ userData }) {
  const {
    name,
    avatar_url,
    html_url,
    login,
    created_at,
    bio,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company,
  } = userData;

  const date = new Date(created_at);
  const formattedDate =
    'Joined ' +
    date
      .toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .split(',')
      .join(' ');

  return (
    <section className="search-results">
      <div className="profile-img-container">
        <img className="profile-img" src={avatar_url} alt="avator pic" />
      </div>

      <div className="title-info">
        {name ? <h1>{name}</h1> : <h1 className="not-avail">Not Available</h1>}
        <h3>
          <a href={html_url} target="_blank" rel="noreferrer">
            @{login}
          </a>
        </h3>
        <p className="created-at-date">{formattedDate}</p>
      </div>
      {bio && <p className="bio">{bio}</p>}
      {!bio && (
        <p className="bio">
          This user has not completed their bio section yet. Check back later!
        </p>
      )}

      <table className="repo-info">
        <thead>
          <tr>
            <td>Repos</td>
            <td>Followers</td>
            <td>Following</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{public_repos}</td>
            <td>{followers}</td>
            <td>{following}</td>
          </tr>
        </tbody>
      </table>

      <ul className="contact-info">
        <li>
          <img src={locationImg} alt="locationImg" />
          {location ? (
            <span>{location}</span>
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={blogImg} alt="blogImg" />
          {blog ? (
            <a href={blog} target="_blank">
              {blog}
            </a>
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={twitterImg} alt="twitterImg" />
          {twitter_username ? (
            <a href={`https://twitter.com/${twitter_username}`} target="_blank">
              {twitter_username}
            </a>
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>

        <li>
          <img src={companyImg} alt="companyImg" />
          {company ? (
            <span>{company}</span>
          ) : (
            <span className="not-avail">Not Available</span>
          )}
        </li>
      </ul>
    </section>
  );
}
