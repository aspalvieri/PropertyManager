import React, { Component } from "react";
import { config } from "../../utils/configs";
//import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="center black-text z-depth-2">
        &copy; 2021 - Alex Spalvieri
        <small className="grey-text text-darken-1" style={{ marginLeft: "10px" }}>(version: {config.VERSION})</small>
      </footer>
    );
  }
}
export default Footer;
