import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';

function App() {
  const [searchPizza, setSearchPizza] = useState('');

  return (
    <div className="wrapper">
      <Header searchPizza={searchPizza} setSearchPizza={setSearchPizza} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchPizza={searchPizza} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
