import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <>
      </>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(Logout);
