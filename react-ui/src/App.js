import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import { Nav } from './Nav';
import { Footer } from './Footer';
import { Home } from './Home';
import Login from './Login';
import { isLogged } from './utils';

function PrivateRouteWithLayout({ component: Component, ...rest }) {
  return (
    <React.Fragment>
      <Nav />
      <Route
        {...rest}
        render={props =>
            isLogged() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
      <Footer />
    </React.Fragment>
  );
}

const ListPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-lg-4 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Criar lista</h5>
              <p className="card-text">Crie sua lista personalizada de produtos orgânicos</p>
              <Link to="/lista/criar"><button className="btn btn-primary">+</button></Link>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Status</h5>
              <p className="card-text">Você acumulou 0 pontos esse mês</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sugestões</h5>
              <p className="card-text">Veja lista de usuários parecido com seu perfil!</p>
              <a href="#" className="btn btn-primary">>></a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 offset-lg-2 col-lg-8 mt-3 mb-3">
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active">
              Minha lista 1
            </a>
            <a href="#" className="list-group-item list-group-item-action">Minha lista 2</a>
            <a href="#" className="list-group-item list-group-item-action">Minha lista 3</a>
            <a href="#" className="list-group-item list-group-item-action">Minha lista 4</a>
            <a href="#" className="list-group-item list-group-item-action disabled">Minha lista 5</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <React.Fragment>
        <Nav />
        <Component {...matchProps} />
        <Footer />
      </React.Fragment>
    )} />
  )
};

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <DefaultLayout path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <PrivateRouteWithLayout path="/home" exact component={ListPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
