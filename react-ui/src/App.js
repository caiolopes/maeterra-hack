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

const Reservar = () => {
  const lists = JSON.parse(localStorage.getItem('myList')) || [];

  return (
    <div className="container">
      <div className="row mt-2 mb-2">
        <div className="offset-1 col-4">
          <div className="list-group" id="list-tab" role="tablist">
            <a className="list-group-item list-group-item-action active" id="list-ze-list" data-toggle="list" href="#list-ze" role="tab" aria-controls="home">Barraca Seu Zé <div className="float-right">3 dos 3 itens</div><br />1,5 km <div className="float-right">R$30,00</div></a>
            <a className="list-group-item list-group-item-action" id="list-ana-list" data-toggle="list" href="#list-ana" role="tab" aria-controls="home">Barraca Dona Ana <div className="float-right">2 dos 3 itens</div><br />2,3 km <div className="float-right">R$20,00</div></a>
            <a className="list-group-item list-group-item-action" id="list-vilma-list" data-toggle="list" href="#list-vilma" role="tab" aria-controls="home">Barraca da Vilma <div className="float-right">1 dos 3 itens</div><br />5 km <div className="float-right">R$10,00</div></a>
          </div>
        </div>
        <div className="col-7">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="list-ze" role="tabpanel" aria-labelledby="list-ze-list">
        <div className="col-md-6 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Seu carrinho</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <div className="mb-3">
            <h5>Data da reserva</h5>
            <input className="form-control" type="date" />
          </div>
          <ul className="list-group mb-3">
            {lists.length > 0 &&
                <div>
                  {lists.map((list, i) => (
                    <div>
                      {list.name}
                        {list.items.map((item, i) => (
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                              <h6 className="my-0">{item.item}</h6>
                              <small className="text-muted">{item.amount} - {item.unit}</small>
                            </div>
                            <span className="text-muted">R$ 10,00</span>
                          </li>
                        ))}
                    </div>
                  ))}
                </div>
            }
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>DESCONTO_MAE_TERRA</small>
              </div>
              <span className="text-success">-R$ 5,00</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (BRL)</span>
              <strong>R$ 25,00</strong>
            </li>
          </ul>
          <hr class="mb-4" />
          <Link to="/checkout"><button class="btn btn-primary btn-lg btn-block" type="submit">Continuar com a reserva</button></Link>
          <hr class="mb-4" />
          <h4>Mapa</h4>
        </div>

              <img src="img/maps.png" width="100%" />
            </div>
            <div className="tab-pane fade" id="list-ana" role="tabpanel" aria-labelledby="list-ana-list">...</div>
            <div className="tab-pane fade" id="list-vilma" role="tabpanel" aria-labelledby="list-vilma-list">...</div>
          </div>
        </div>
      </div>
    </div>
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
                        <Link to="/reservar"><button className="btn btn-primary">Reservar</button></Link>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>
          <div className="list-group">
            {lists.length === 0 &&
                <h3>{localStorage.getItem('user') == 'sandra@gmail.com' ? 'Oi Sandra, ' : 'Oi,'} você ainda não construiu nenhuma lista ainda</h3>
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

const Checkout = (props) => {
  window.swal(
    'Reserva efetuada',
    'O feirante será avisado sobre sua reserva',
    'success'
  )
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-lg-3 col-lg-6 mt-3 mb-3">
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        </div>
      </div>
    </div>
  );
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
          <PrivateRouteWithLayout path="/reservar" exact component={Reservar} />
          <PrivateRouteWithLayout path="/checkout" exact component={Checkout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
