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
  const lists = JSON.parse(localStorage.getItem('myList')) || [];

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
          <div className="accordion mb-5" id="accordionExample">
            {lists.length > 0 &&
                lists.map((list, i) => (
                  <div key={i} className="card">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          {list.name}
                        </button>
                      </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                        <ul>
                          {list.items.map((item, i) => (
                            <li>{item.item} - {item.amount} - {item.unit}</li>
                          ))}
                        </ul>
                        <Link to=""><button class="btn btn-primary">Reservar</button></Link>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>
          <div className="list-group">
            {lists.length === 0 &&
                <h3>Você ainda não construiu nenhuma lista ainda</h3>
            }
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

class CreateList extends Component {
  state = {
    listName: '',
    items: [''],
  };

  handleChange = (i) => {
    return (e) => {
      const value = e.target.value;
      const items = this.state.items;
      items[i] = value;
      this.setState({items});
    }
  };

  render() {

    const renderInputItens = () => {
      let inputs = [];
      for (let i = 0; i < this.state.items.length; i++) {
        inputs.push(
          <div className="row mt-3" key={i}>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                value={this.state.items[i]} onChange={this.handleChange(i)} placeholder={`Item ${i}`} />
            </div>
            <div className="col-md-4">
              <input className="form-control" type="number" placeholder="Qtd" />
            </div>
            <div className="col-md-3">
              <select className="form-control">
                <option>kg</option>
                <option>unidades</option>
              </select>
            </div>
          </div>
        );
      }
      return (
        <div>
          {inputs}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-lg-3 col-lg-6 mt-3 mb-3">
            <div className="form-group">
              <label>Nome da lista</label>
              <input type="text" className="form-control" placeholder="Nome da lista" value={this.state.listName} onChange={(e => {
                this.setState({listName: e.target.value});
              })}/>
            </div>
            <div className="form-group">
              <label>Produtos:</label>
              {renderInputItens()}
              <button className="btn btn-primary mt-3" onClick={(e) => {
                const items = this.state.items;
                items.push('');
                this.setState({ items });
              }}>+</button>
          </div>
          <Link to="/home"><button className="btn btn-primary mt-3" onClick={() => {
            let items = this.state.items;
            let lists = [
              { name: this.state.listName, items: items.map(item => ({ item: item, unit: 'unidades', amount: 5 })) }
            ];
            localStorage.setItem('myList', JSON.stringify(lists));
          }}>Salvar</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <DefaultLayout path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <PrivateRouteWithLayout path="/home" exact component={ListPage} />
          <PrivateRouteWithLayout path="/lista/criar" exact component={CreateList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
