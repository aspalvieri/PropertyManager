import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import M from "materialize-css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  componentDidMount() {
    
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    //For specific dashboards (IE: tenant gets less stuff:)
    //if (user.role === 'ROLE') {  return (<Component /> );  }
    //else (etc . . .) . . .
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s12 center-align">
            <p className="flow-text">
              <b>Logged in as:</b> {user.username}<br/>
              <b>Role:</b> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
            <button 
              style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}}
              onClick={this.onLogoutClick} 
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
