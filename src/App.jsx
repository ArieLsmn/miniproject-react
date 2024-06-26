import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem } from 'src/store/cartSlice'

import OrderList from './pages/OrderList'
import ProductOrder from './pages/ProductOrder'
import ListTransaksi from './pages/ListTransaksi'
import DetailTransaksi from './pages/DetailTransaksi'
import ListProduct from './pages/ListProduct'
import ListCategory from './pages/ListCategory'
import DetailProduk from './pages/DetailProduk'
import DetailKategori from './pages/DetailKategori'
import ProductForm from './pages/ProductForm'
import CategoryForm from './pages/CategoryForm'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<ProductOrder />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/transaksi" element={<ListTransaksi />} />
        <Route path="/transaksidetail" element={<DetailTransaksi />} />
        <Route path="/listproduk" element={<ListProduct />} />
        <Route path="/detailproduk/:paramId" element={<DetailProduk />} />
        <Route path="/formproduk/" element={<ProductForm />} />
        <Route path="/listkategori" element={<ListCategory />} />
        <Route path="/detailkategori/:paramId" element={<DetailKategori />} />
        <Route path="/formkategori" element={<CategoryForm />} />
        
      </Routes>
    </BrowserRouter>
  );

}

export default App
