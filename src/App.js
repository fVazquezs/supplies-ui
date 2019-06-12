import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard.js';

function App() {
  return (
    <div className="App">
      <header>
        <nav className="main-nav">
          <ul>
            <li>
              <a href='#'>Products</a>
            </li>
            <li>
              <a href='#'>Users</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="master">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      </div>
    </div>
  );
}

export default App;
