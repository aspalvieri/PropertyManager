import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      property: []
    }
  }

  componentDidMount() {
    if (this.props.auth.user.role === "tenant") {
      this.props.history.push("/dashboard");
      return;
    }
    let found = false;
    for (let p of this.props.properties.properties) {
      if (p._id === this.props.match.params.id) {
        found = true;
        this.setState({ property: p });
      }
    }
    if (!found) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s12 center-align">
            <h4>{this.state.property.name}</h4>
            <p>ID: {this.state.property._id}</p>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Property.propTypes = {
  auth: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  properties: state.properties
});

export default connect(
  mapStateToProps,
  { }
)(Property);
