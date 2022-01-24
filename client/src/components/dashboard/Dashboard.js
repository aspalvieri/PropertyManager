import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getProperties, createProperty, deleteProperty, updateProperty } from "../../actions/propertyActions";
import classnames from "classnames";
import Loading from "../style/Loading";
import M from "materialize-css";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Page loading
      loading: true,
      //Action/submit loading
      load: false,
      properties: [],
      errors: {},
      propertyName: "",
      propertyID: null,
      propertyModal: null,
      deleteName: "",
      deleteID: null,
      deleteModal: null,
      updateModal: null
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
      if (this.state.updateModal !== null) {
        this.setState({ propertyName: "" });
        this.state.updateModal.close();
      }
    }
    //Finished loading 
    if (prevState.loading !== this.state.loading) {
      let elems = document.querySelectorAll('.modal');
      let modals = M.Modal.init(elems);
      this.setState({ propertyModal: this.findModal("createProperty", modals) });
      this.setState({ deleteModal: this.findModal("deleteProperty", modals) });
      this.setState({ updateModal: this.findModal("updateProperty", modals) });
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

  onUpdateProperty = e => {
    e.preventDefault();
    const userData = {
      id: this.state.propertyID,
      name: this.state.propertyName
    };
    this.setState({ load: true });
    this.props.updateProperty(userData);
  }

  deleteProperty = id => {
    this.props.deleteProperty(id);
    this.state.deleteModal.close();
  }

  modalDeleteProperty = (id, name) => {
    this.setState({ deleteID: id, deleteName: name });
  }

  modalupdateProperty = (id, name) => {
    this.setState({ propertyID: id, propertyName: name });
  }

  modalCreateProperty = e => {
    this.setState({ propertyName: "" });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(null);
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
                    <td className="">&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property._id}>
                      <td className="center-align flow-text"><Link to={`/properties/${property._id}`}>{property.name}</Link></td>
                      <td>
                        <button className="waves-effect waves-light hoverable btn modal-trigger" data-target="updateProperty" style={{ marginRight: "10px" }}
                        onClick={() => this.modalupdateProperty(property._id, property.name)}>
                        <i className="material-icons">edit</i></button>
                        <button className="waves-effect waves-light hoverable btn red accent-2 modal-trigger" data-target="deleteProperty"
                        onClick={() => this.modalDeleteProperty(property._id, property.name)}><i className="material-icons">delete</i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-action">
                <button data-target="createProperty" style={{ borderRadius: "3px", letterSpacing: "1.5px" }}
                className="waves-effect waves-light btn modal-trigger" onClick={this.modalCreateProperty}>Create Property</button>
              </div>
            </div>
            {/* CREATE Property Modal */}
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
            {/* DELETE Property Modal */}
            <div id="deleteProperty" className="modal" style={{ maxWidth: "550px" }}>
              <div className="modal-content">
                <h4><b>Delete</b> Property</h4>
                <p className="flow-text">Are you sure you wish to delete <b>{this.state.deleteName}</b>?</p>
                <button className="waves-effect waves-light hoverable btn red accent-2" 
                style={{ marginRight: "25px" }} onClick={() => this.deleteProperty(this.state.deleteID)}>DELETE</button>
                <a href="#!" className="modal-close waves-effect waves-light hoverable btn">CANCEL</a>
              </div>
            </div>
            {/* UPDATE Property Modal */}
            <div id="updateProperty" className="modal" style={{ maxWidth: "550px" }}>
            <div className="modal-content">
                <h4><b>Update</b> Property</h4><br/>
                <form noValidate onSubmit={this.onUpdateProperty}>
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
                    Update
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
  deleteProperty: PropTypes.func.isRequired,
  updateProperty: PropTypes.func.isRequired,
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
  { logoutUser, getProperties, createProperty, deleteProperty, updateProperty }
)(Dashboard);
