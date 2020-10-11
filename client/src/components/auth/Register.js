import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor() {
    super();

    //Local state
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    //NOTE:
    //This is how you trigger an action
    //when you connect a action 'registerUser' at the bottom of the component, registerUser gets added to this component's property
    // so you can trigger as this.props.registerUser and pass newUser values
    this.props.registerUser(newUser, this.props.history);
  }

  //example of a lifecycle method which will let all components know whenever any state changes.

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   if(nextProps.errors){
  //     this.setState({errors: nextProps.errors});
  //   }
  // }

  //refactoring from componentWillReceiveProps(nextProps)

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
  }

 

  render() {
    //deconstructing errors from this.state
    //following is the same as const errors = this.state.errors;
    //With componentWillReceiveProps method, you can now read errors from the local state.
    // const { errors } = this.state;

    //read errors from the store
    const { errors } = this.state;
    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name,
                    })}
                    // className='form-control form-control-lg'
                    placeholder='Name'
                    name='name'
                    //one way binding. The 'value' below can only read data from the state but can't not change value. So when you type something in the input box, you can't type anything into.
                    value={this.state.name}
                    // To change the value, you need two way binding and bind the value to the onChange event property with a function

                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>

                <div className='form-group'>
                  <input
                    type='email'
                    // className='form-control form-control-lg'
                    // use of classnames library to have conditional is-valid based on the error message existance

                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email,
                    })}
                    placeholder='Email Address'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <small className='form-text text-muted'>
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2,
                    })}
                    // className='form-control form-control-lg'
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className='invalid-feedback'>{errors.password2}</div>
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

//it's not required but good coding practice is to ensure required data types and all dependencies are loaded before a component is even  loaded. Otherwise, do not load a component.
//isRequired means the data is there even though it's empty
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

//read data back from the store
const mapStateToProps = (state) => ({
  errors: state.errors,
});
//connect ('incoming data from the store', action to trigger)
export default connect(mapStateToProps, { registerUser })(Register);
