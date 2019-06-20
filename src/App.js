import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Users from './components/Users/Users';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cart: [], expand: false };
  }

  updateCart = product => {
    var newCart = this.state.cart.slice();
    newCart.push(product);
    this.setState({ cart: newCart })
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
      <div>
        <button className='menu-button' onClick={() => this.setState({ expand: false })}>
          <FontAwesomeIcon icon={faTimes} />

        </button>
        <ul>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          <li>
            <Link to='/orders'>Orders</Link>
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
        <div className="App">
          <header>
            {window.innerWidth < 400 ? this.mobileNav() : this.desktopNav()}
          </header>
          <Route path='/products' render={(props) => <Products {...props} updateCart={this.updateCart} />} />
          <Route path='/users' component={Users} />
          <Route path='/orders' component={Orders} />
          <Route path='/cart' render={(props) => <Cart {...props} cart={this.state.cart} />} />
        </div>
      </Router>
    );
  }
}
