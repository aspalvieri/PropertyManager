import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getProperties, createProperty } from "../../actions/propertyActions";
import classnames from "classnames";
import Loading from "../style/Loading";
import M from "materialize-css";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      //Page loading
      loading: true,
      //Action/submit loading
      load: false,
      properties: [],
      errors: {},
      propertyName: "",
      propertyModal: null
    }
  }

  componentDidMount() {
    //Update state based on user's role
    if (this.props.auth.user.role === "manager" || this.props.auth.user.role === "landlord") {
      this.props.getProperties();
    }
    else {
      this.setState({ loading: false });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //Set properties state
    if (nextProps.properties.properties !== prevState.properties) {
      return {
        properties: nextProps.properties.properties
      };
    }
    //If the error props changed, update and enable login button
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors,
        load: false
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    //Finished loading properties OR properties updated
    if (prevState.properties !== this.state.properties) {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
      if (this.state.propertyModal !== null) {
        this.setState({ propertyName: "" });
        this.state.propertyModal.close();
      }
    }
    //Finished loading 
    if (prevState.loading !== this.state.loading) {
      let elems = document.querySelectorAll('.modal');
      let modals = M.Modal.init(elems);
      this.setState({ propertyModal: this.findModal("createProperty", modals) })
    }
  }

  findModal = (modal, modals) => {
    for (let m of modals) {
      if (m.id === modal)
        return m;
    }
    return null;
  }

  onCreateProperty = e => {
    e.preventDefault();
    const userData = {
      name: this.state.propertyName
    };
    this.setState({ load: true });
    this.props.createProperty(userData);
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    const properties = this.props.properties.properties;

    if (user.role === "manager") {
      if (this.state.loading) {
        return (
          <Loading />
        )
      }
      return (
        <div className="container">
          <div className="row">
            <div className="col s12 m5 center-align card">
              <p className="flow-text">
                <b>Logged in as:</b> {user.username}<br/>
                <b>Role:</b> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
              <div className="card-action">
                <button 
                  style={{width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }}
                  onClick={this.onLogoutClick} 
                  className="btn waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="col s12 m6 offset-m1 center-align card">
              <table>
                <thead>
                  <tr>
                    <td className="center-align"><h4><b>Properties</b></h4></td>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property._id}>
                      <td className="center-align flow-text"><Link to={`/properties/${property._id}`}>{property.name}</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-action">
                <button data-target="createProperty" style={{ borderRadius: "3px", letterSpacing: "1.5px" }}
                className="waves-effect waves-light btn modal-trigger">Create Property</button>
              </div>
            </div>
            {/* Create Property Modal */}
            <div id="createProperty" className="modal" style={{ maxWidth: "550px" }}>
              <div className="modal-content">
                <h4><b>Create</b> Property</h4><br/>
                <form noValidate onSubmit={this.onCreateProperty}>
                  <div className="input-field s12">
                    <input
                      disabled={this.state.load ? "disabled" : ""}
                      onChange={this.onChange}
                      value={this.state.propertyName}
                      error={errors.name}
                      autoComplete="name"
                      id="propertyName"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                    <label htmlFor="propertyName">Property Name</label>
                    <span className="red-text">
                      {errors.name}
                    </span>
                    
                  </div>
                  <div className="s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    disabled={this.state.load ? "disabled" : ""}
                    style={{
                      width: "140px",
                      height: "42px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn waves-effect waves-light hoverable blue accent-3"
                  >
                    Create
                  </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
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
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getProperties: PropTypes.func.isRequired,
  createProperty: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  properties: state.properties
});

export default connect(
  mapStateToProps,
  { logoutUser, getProperties, createProperty }
)(Dashboard);
