import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

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

    axios
      .post('/api/users/register', newUser)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  }
  render() {
    //deconstructing errors from this.state
    //following is the same as const errors = this.state.errors;
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
export default Register;
