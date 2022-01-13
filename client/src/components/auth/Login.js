import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import queryString from 'query-string';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      load: false,
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard"); // push user to dashboard when they login
    }
    //If the error props changed, update and enable login button
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors,
        load: false
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.setState({ load: true });
    this.props.loginUser(userData);
  };

  userRegistered(registered) {
    if (registered === "true")
      return (
        <h5 style={{ padding: "10px", borderRadius: "5px", textAlign: "center" }}
        className="green accent-2 z-depth-2">
          Your account has been successfully created.
        </h5>
      )
    else
      return (null);
  }

  render() {
    const { errors } = this.state;
    const getParams = queryString.parse(this.props.location.search)
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            {this.userRegistered(getParams.registered)}
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  disabled={this.state.load ? "disabled" : ""}
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  autoComplete="username"
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username || errors.usernotfound
                  })}
                />
                <label htmlFor="username">Email / ID</label>
                <span className="red-text">
                  {errors.username}
                  {errors.usernotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  disabled={this.state.load ? "disabled" : ""}
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  autoComplete="current-password"
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  disabled={this.state.load ? "disabled" : ""}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
