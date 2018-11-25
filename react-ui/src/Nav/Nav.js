import React from 'react';
import { Link } from "react-router-dom";
import { isLogged, signOut } from '../utils';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light static-top">
      <Link to="/" className="navbar-brand">Guardaê</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Lista</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reserva">Reserva</Link>
          </li>
        </ul>
        {!isLogged() &&
            <Link className="btn btn-primary" to="/login">Entrar</Link>
        }
        {isLogged() &&
            <Link className="btn btn-primary" onClick={signOut} to="/">Sair</Link>
        }
        </div>
      </nav>
  );
}

export default Nav;
