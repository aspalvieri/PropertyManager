import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s12 center-align">
            <h2><b>404:</b> Page Not Found</h2>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
