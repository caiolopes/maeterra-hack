import React from 'react';
import { Link } from "react-router-dom";
import { isLogged, setLogin } from './utils';
import './login.css';

class Login extends React.Component {
  state = {
    email: '',
  }

  render() {
    return (
      <div className="login text-center">
        <form className="form-signin">
          <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Digite os dados</h1>
          <b className="mb-3">para entrar no Guardaê</b>
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="E-mail" value={this.state.email} onChange={(e) => {
            this.setState({email: e.target.value });
          }} required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Senha</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Senha" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Lembrar próxima vez
            </label>
          </div>
          <Link to="/home" onClick={() => setLogin(this.state.email)}><button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button></Link>
        </form>
      </div>
    );
  }
}

export default Login;
