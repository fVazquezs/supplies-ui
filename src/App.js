import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import Users from './components/Users/Users';
import Orders from './components/Orders/Orders';

export default class extends React.Component {



  render() {
    return (
      <Router>
        <div className="App">
          <header>
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
                <li>
                  <i class="fas fa-shopping-cart"></i>
                </li>
              </ul>
            </nav>
          </header>
          <Route path='/products' component={Products} />
          <Route path='/users' component={Users} />
          <Route path='/orders' component={Orders} />
        </div>
      </Router>
    );
  }
}
