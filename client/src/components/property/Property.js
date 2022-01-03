import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUnits, createUnit } from "../../actions/unitActions";
import classnames from "classnames";
import Loading from "../style/Loading";
import M from "materialize-css";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      property: [],
      //Action/submit loading
      load: false,
      units: [],
      errors: {},
      unitName: "",
      unitModal: null
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
        this.props.getUnits(p._id, this.props.history);
      }
    }
    if (!found) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //Set units state
    if (nextProps.units.units !== prevState.units) {
      return {
        units: nextProps.units.units
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
    //Finished loading units OR properties units
    if (prevState.units !== this.state.units) {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
      if (this.state.unitModal !== null) {
        this.setState({ unitName: "" });
        this.state.unitModal.close();
      }
    }
    //Finished loading 
    if (prevState.loading !== this.state.loading) {
      let elems = document.querySelectorAll('.modal');
      let modals = M.Modal.init(elems);
      this.setState({ unitModal: this.findModal("createUnit", modals) });
    }
  }

  findModal = (modal, modals) => {
    for (let m of modals) {
      if (m.id === modal)
        return m;
    }
    return null;
  }

  onCreateUnit = e => {
    e.preventDefault();
    const userData = {
      id: this.state.property._id,
      name: this.state.unitName
    };
    this.setState({ load: true });
    this.props.createUnit(userData);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { errors, units } = this.state;

    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m5 center-align card">
            <h4>{this.state.property.name}</h4>
            <p>ID: {this.state.property._id}</p>
            <div className="card-action">
              <Link to="/" className="btn-flat black-text waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to home
              </Link>
            </div>
          </div>
          <div className="col s12 m6 offset-m1 center-align card">
            <table>
              <thead>
                <tr>
                  <td className="center-align"><h4><b>Units</b></h4></td>
                </tr>
              </thead>
              <tbody>
                {units.map(unit => (
                  <tr key={unit._id}>
                    <td className="center-align flow-text">{unit.name}</td>
                    {/*<td className="center-align flow-text"><Link to={`/units/${unit._id}`}>{unit.name}</Link></td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card-action">
              <button data-target="createUnit" style={{ borderRadius: "3px", letterSpacing: "1.5px" }}
              className="waves-effect waves-light btn modal-trigger">Add Unit</button>
            </div>
          </div>
          {/* Create Unit Modal */}
          <div id="createUnit" className="modal" style={{ maxWidth: "550px" }}>
              <div className="modal-content">
                <h4><b>Add</b> Unit</h4><br/>
                <form noValidate onSubmit={this.onCreateUnit}>
                  <div className="input-field s12">
                    <input
                      disabled={this.state.load ? "disabled" : ""}
                      onChange={this.onChange}
                      value={this.state.unitName}
                      error={errors.name}
                      autoComplete="name"
                      id="unitName"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                    <label htmlFor="unitName">Unit Name</label>
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
}

Property.propTypes = {
  getUnits: PropTypes.func.isRequired,
  createUnit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  properties: state.properties,
  units: state.units
});

export default connect(
  mapStateToProps,
  { getUnits, createUnit }
)(Property);
