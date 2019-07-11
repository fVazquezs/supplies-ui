import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Modal, Input, Button } from 'semantic-ui-react';
import Supplies from './api/Supplies.js';
import Products from './components/Products/Products';
import Users from './components/Users/Users';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';
import Departments from './components/Departments/Departments';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cart: [], expand: false, email: '', password: '', isUserLogin: false };
    this.suppliesDataService = new Supplies();
  }

  updateCart = product => {
    var newCart = this.state.cart.slice();
    newCart.push(product);
    this.setState({ cart: newCart })
  }

  isUserAuthenticated = () => {
    if (window.sessionStorage.getItem("token")) {
      return true;
    } return this.state.isUserLogin ? true : false;
  }

  authenticateUser = async () => {
    const response = await this.suppliesDataService.authenticate(this.state.email, this.state.password);
    if (response.data.token) {
      window.sessionStorage.setItem("token", response.data.token)
      this.setState({ isUserLogin: true })
    }
  }

  desktopNav = () => {
    return (
      <nav className="main-nav">
        <ul>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/departments'>Departments</Link>
          </li>
          <li>
            <Link to='/orders'>Orders</Link>
          </li>
        </ul>
        <Link className="shopping-cart" to='/cart'>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </nav>
    );
  }

  mobileNav = () => {
    const menuIcon = this.state.expand ? (
      <div className="expanded-menu">
        <button className='menu-button' onClick={() => this.setState({ expand: false })}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <ul>
          <li>
            <Link to='/products' onClick={() => this.setState({ expand: false })}>Products</Link>
          </li>
          <li>
            <Link to='/users' onClick={() => this.setState({ expand: false })}>Users</Link>
          </li>
          <li>
            <Link to='/departments' onClick={() => this.setState({ expand: false })}>Departments</Link>
          </li>
          <li>
            <Link to='/orders' onClick={() => this.setState({ expand: false })}>Orders</Link>
          </li>
        </ul>
      </div>
    ) : (
        <button className='menu-button' onClick={() => this.setState({ expand: true })}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      );
    return (
      <nav className="mobile-nav">
        {menuIcon}

        <Link className="shopping-cart" to='/cart'>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>

      </nav>
    );
  }

  render() {
    return (
      <Router>
        <Modal className="login-modal" open={!this.isUserAuthenticated()}>
          <Modal.Header>Login</Modal.Header>
          <Modal.Content>
            <Modal.Description className="login-inputs">
              <Input className="email-input" placeholder='Email' onChange={(event, data) => this.setState({ email: data.value })} />
              <Input className="password-input" type="password" placeholder='Password' onChange={(event, data) => this.setState({ password: data.value })} />
            </Modal.Description>
            <Button onClick={this.authenticateUser}>Login</Button>
          </Modal.Content>
        </Modal>
        <div className="App">
          <header className={this.state.expand ? 'expanded-header' : 'minify-header'}>
            {window.innerWidth < 400 ? this.mobileNav() : this.desktopNav()}
          </header>
          <div className="filler" />
          <Route path='/products' render={(props) => <Products {...props} updateCart={this.updateCart} />} />
          <Route path='/users' component={Users} />
          <Route path='/departments' component={Departments} />
          <Route path='/orders' component={Orders} />
          <Route path='/cart' render={(props) => <Cart {...props} cart={this.state.cart} />} />
        </div>
      </Router >
    );
  }
}
