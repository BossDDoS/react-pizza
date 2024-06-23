import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка пицц...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
