import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../service/service';
import { addNameEmail } from '../redux/actions';
import logo from '../images/logo.png';
import '../styles/Login.css';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleClick = async () => {
    const { history: { push } } = this.props;
    const token = await fetchToken();
    const { dispatch } = this.props;
    const { email, name } = this.state;

    localStorage.setItem('token', token);
    console.log(token);

    dispatch(addNameEmail(email, name));
    if (token) return push('/game');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;
    const { handleChange, handleClick } = this;

    return (
      <div className="container-login">
        <img src={ logo } alt="logo" className="logo-trivia" />
        <div className="login">
          <form>
            <input
              type="email"
              data-testid="input-gravatar-email"
              value={ email }
              name="email"
              onChange={ handleChange }
              placeholder="Digite o seu e-mail"
            />
            <input
              type="text"
              data-testid="input-player-name"
              value={ name }
              name="name"
              onChange={ handleChange }
              placeholder="Digite o seu nome"
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(name.length > 0 && email.length > 0) }
              onClick={ handleClick }
              className="button-login"
            >
              Play
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
