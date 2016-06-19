import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show link to sign out
      return (
        <li className="menu__item">
          <Link to="/signout" className="menu__link">Sign Out</Link>
        </li>
      );
    } else {
      // show link to sign in or sign up
      return [
        <li className="menu__item" key={1}>
          <Link to="/signin" className="menu__link">Sign In</Link>
        </li>,
        <li className="menu__item" key={2}>
          <Link to="/signup" className="menu__link">Sign Up</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <nav>
        <Link to="/" className="logo">Sparkq</Link>
        <ul className="menu">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Header);
