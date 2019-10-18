import React from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    auth: {
      username: '',
      password: '',
    }
  };

  handleChange = event => {
    this.setState ({
      auth: {
        ...this.state.auth,
        [event.target.name] : event.target.value,
      }
    })
  };

  login = event => {
    event.preventDefault();

    axiosWithAuth()
    .post('/login', this.state.auth)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      this.props.history.push('/protected')
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='login-container'>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login} className='login-form'>
          <input 
            type='text'
            name='username'
            placeholder='Enter Username'
            value={this.state.auth.username}
            onChange={this.handleChange}
          />
          <input 
            type='text'
            name='password'
            placeholder='Enter Password'
            value={this.state.auth.password}
            onChange={this.handleChange}
          />
          <button className='login-button'>Login</button>
        </form>
      </div>
    );
  }
};

export default Login;
