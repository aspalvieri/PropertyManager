import React, { Component } from "react";
import { Link } from "react-router-dom";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      id: ""
    }
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id })
  }

  render() {
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s12 center-align">
            <h4>ID: {this.state.id}</h4>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Property;
