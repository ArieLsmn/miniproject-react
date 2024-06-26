import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCard from 'src/components/ProductCard'
import Cart from 'src/components/Cart'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem } from 'src/store/cartSlice'


function ProductOrder() {
  const [count, setCount] = useState(0);
  const [dataState, setDataState] = useState([]);
  const [filterState, setFilter] = useState(0);
  const [sortState, setSort] = useState("id");
  const [searchState, setSearch] = useState("");
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  useEffect(() => {
    axios.get(`http://localhost:8080/pos/api/listproduct?sort_by=${sortState}&sort_order=asc&title=${searchState}`).then((response) => {
      console.log(response.data);
      setDataState(response.data);
    }).catch((error) => { console.log(error); });
  }, [sortState,searchState]);

  let data = []
  if (filterState > 0)
    data = dataState.filter((e) => e.category_id == filterState);
  else data = dataState;


  function handleSearch(value) {
    setSearch(value);
    //console.log(searchState);
  }

  const handleAddToCart = (product) => {
    let cart = items;
    //console.log(cartData);
    const item = cart.find(it => it.id == product.id);
    const prevQuantity = item ? item.quantity : 0;
    //console.log(item);
    if (prevQuantity == 0) {

      dispatch(addItem({
        product: product,
        quantity: prevQuantity + 1
      }));

    }

    else {

      dispatch(addItem({
        product: product,
        quantity: prevQuantity + 1
      }));

    }

  }

  return (
    <div className="flex flex-row relative">

      <div className="container flex flex-col justify-center h-fit relative w-3/5">
        <div className="flex flex-row">
          <select className='border-2 border-gray-300 p-2 w-1/5'
            name="sort"
            id="sort"
            onChange={(e)=>{setSort(e.target.value)}}>
              <option value="id">Id</option>
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="category_id">Category</option>
          </select>


          <input className='border-2 border-gray-300 p-2 w-3/5'
            name="title"
            id="title"
            type="text"
            onChange={(e)=>{handleSearch(e.target.value)}}
          />

        </div>
        <div className="flex flex-col lg:flex-wrap lg:flex-row place-content-center justify-start my-5">

          {data.map((element) => {

            return (
              <div className="my-5">
                <ProductCard product={element} addProduct={handleAddToCart} > </ProductCard>
              </div>
            );
          })}
        </div>
        <div>
          <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => { setFilter(0) }}>All</button>
          <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => { setFilter(1) }}>Smartphone</button>
          <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => { setFilter(2) }}>Computers</button>
          <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => { setFilter(3) }}>Accessories</button>
          <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => { setFilter(7) }}>Others</button>
        </div>
      </div>
      <div className="flex relative h-full inset-y-0 right-0 justify-end">

        <Cart />

      </div>

    </div>
  );

}

export default ProductOrder;
