import React from 'react';
import { useState, useEffect, useContext } from "react";
import './App.css';
import {
  Link,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useParams,
} from "react-router-dom";

import Home from './pages/Home';

import About from './pages/About';
import Contact from './pages/Contact';

import Layout from './layout/Layout';
//import { prod0 } from 'src/data/ListArray';
import ProductDetail from './components/ProductDetail';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import AdminForm from './pages/AdminForm';
import AdminFormUpdate from './pages/AdminFormUpdate';
//import ShoppingCart from './components/ShoppingCart';
import { CartProvider, CartContext } from 'src/components/CartContext.jsx'
import store from './store/index.js'
import { Provider } from 'react-redux'
import AdminRoutes from './routes/AdminRoutes';
import Login from './pages/Login';
import GuestRoutes from './routes/GuestRoutes';
import Register from './pages/Register';
import PrivateRoutes from './routes/PrivateRoutes';
import UserPage from './pages/LoginTest';
import ProductList from './pages/ListPage';

/*function ProductPage() {
  let { paramId } = useParams();
  return(

      <ProductDetail product={prod0.find(x => x.id == paramId)} />

  );
};*/


function App() {



  //return (
  //<AdminPage />
  //);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail/:paramId" element={<ProductPage />} />
            
            <Route path="/adminform" element={<AdminForm />} />
            <Route path="/adminupdate/:paramId" element={<AdminFormUpdate />} />
            <Route path="/productlist" element ={<ProductList/>} />
            
              <Route path="/login" element={<Login />} />
            


                <Route path="/admin" element={<AdminPage />} />
              
              <Route path="/logintest" element={<UserPage />} />
            

            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Provider>
    </>
  );

};

export default App;

