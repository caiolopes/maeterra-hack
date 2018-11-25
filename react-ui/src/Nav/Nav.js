import React from 'react';
import { Link } from "react-router-dom";
import { isLogged, signOut } from '../utils';

const Nav = () => {
  return (
    <nav className="navbar navbar-light bg-light static-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">Guardaê</Link>
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
