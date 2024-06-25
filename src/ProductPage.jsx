import React from 'react'
import { useState, useContext,useEffect } from 'react'
import ProductDetail from 'src/components/ProductDetail';
//import { prod0 } from 'src/data/ListArray';
import {
    useParams,
  } from "react-router-dom";
  import useSWR from 'swr'
import axiosFetch from 'src/components/AxiosFetch';
import axios from 'axios';
import { CartContext } from 'src/components/CartContext';
//import { updateCartItem,updateCartItemQuantity,clearCart,getCartTotal } from 'src/store/action/cartAction'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from 'src/store/cartSlice';

function ProductPage({cart,addItem}) {
    let { paramId } = useParams();
    const dispatch = useDispatch(); 
    const { items } = useSelector(state => state.cart);
    //const { cartItems, addToCart } = useContext(CartContext); 
    const {data:prodData , error:error0, isLoading:load0} = useSWR(`http://localhost:3001/products/${paramId}`,axiosFetch);
    //const {data:prod1Data , error:error1, isLoading:load1} = useSWR("http://localhost:3001/products/",axiosFetch);
    const {mutate:mutateCart} = useSWR("http://localhost:3001/cart",axiosFetch);
    if (load0) return <h2>Loading...</h2>;
    //const [dataState, setDataState] = useState([]);
    console.log(prodData);
    //let data=prod1Data.find(x => x.id === parseInt(paramId));
    let data=prodData;
    const handleAddToCart = (product,qty) => {
    
      const item = items.find(it => it.id == product.id);
      const prevQuantity = item ? item.quantity : 0;
      console.log(qty);
      if(prevQuantity==0 && qty>0){
        axios.post("http://localhost:3001/cart", {
          id:product.id,
          product: product,
          quantity: prevQuantity + qty
        }).then(() => {
          console.log("INIT PROD");
          console.log(product.id);
          dispatch(addItem({
            product: product,
            quantity: prevQuantity + qty
          }));
          mutateCart();
        })
          .catch((error) => {
            console.log("Error", error);
          });
        }
        else{
          axios.put(`http://localhost:3001/cart/${product.id}`,{
            product: product,
            quantity: prevQuantity + qty
          }).then(() => {
            dispatch(addItem({
              product: product,
              quantity: prevQuantity + qty
            }));
            mutateCart();
          })
          .catch((error) => {
            console.log("Error", error);
          });
  }
}

    return(
<>
        
        <ProductDetail product={data}   
        addToCart={handleAddToCart}
        />
        </>
//return(<>{console.log(prod1Data)}</>
    );

}
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(
  mapStateToProps,
  {addItem}
) (ProductPage)
