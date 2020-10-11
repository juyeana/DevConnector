import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    //alias to simplify the code
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //e: passing the value of input box
  onChange(e) {
    //[] : property binding
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    //to prevent html defualt submit click event.
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(user);
  }

  // componentWillReceiveProps(nextProps) {

  //   if(nextProps.history){
  //     this.props.history.push('/dashboard')
  //   }
  //   if(nextProps.errors){
  //     this.setState({errors: nextProps.errors});
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {

      props.history.push('/dashboard')
    }
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }
  render() {
    const { errors } = this.state;
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email,
                    })}
                    // className='form-control form-control-lg'
                    placeholder='Email Address'
                    name='email'
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password,
                    })}
                    // className='form-control form-control-lg'
                    placeholder='Password'
                    name='password'
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Login);
