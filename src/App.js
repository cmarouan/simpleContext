import React, { useContext } from 'react';
import Products from './components/Products';
import MyCard from './components/MyCard';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Error from './components/Error'
import './mycss.css';
import { ProductContext } from './Contexts/ProductContext';

function App() {
  const context = useContext(ProductContext);
  return (
      <div >
      <Navbar />
      {!context.state.products.error && <div id="app">
        <div>
          {context.state.products.loading && <Loading />}
          {!context.state.products.loading && <Products />}
        </div>
        <div>
          <MyCard />
        </div>
      </div>}
      {context.state.products.error && <Error />}
    </div>
  );
}

export default App;
