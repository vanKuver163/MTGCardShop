import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { CategoriesProvider } from './context/CategoriesProvider';
import { ProductsProvider } from './context/ProductsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <CategoriesProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CategoriesProvider>
  </AuthProvider>
  // </React.StrictMode>
);
