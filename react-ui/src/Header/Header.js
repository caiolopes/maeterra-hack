import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="masthead text-white text-center">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <h1 className="mb-5">Ache produtos orgânicos perto de você e reserve!</h1>
          </div>
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <input type="email" className="form-control form-control-lg" placeholder="Digite seu e-mail..." />
                </div>
                <div className="col-12 col-md-3">
                  <Link to="/home"><button type="submit" className="btn btn-block btn-lg btn-primary">Cadastre-se</button></Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
