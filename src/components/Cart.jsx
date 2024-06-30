import axios from 'axios';
import { useContext, useEffect } from 'react'
import { useReducer } from 'react'
import { useSelector, connect, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { clearCart, addItem, updateItem, fillCart } from 'src/store/cartSlice';
import toRupiah from './ToRupiah';


function Cart() {
  //const { dataCheckout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  let cartItems = items;

  let totalPrice = 0;
  if (cartItems !== undefined && cartItems.length > 0) {
    cartItems.forEach(element => {
      //let disc = element.product.discount;
      totalPrice += (element.product.price - 1000) * element.quantity;
    });
  }
  //console.log(totalPrice);

  function handleClearCart() {
    dispatch(clearCart());
  }

  function handleUpdateItem(product, qty) {
    let cart = items;
    console.log(cart);
    const item = cart.find(it => it.product.id == product.id);
    const prevQuantity = item ? item.quantity : 0;
    if (qty === 0) {//utk remove
      dispatch(updateItem({
        product: product,
        quantity: 0
      }));

    } else {
      dispatch(updateItem({
        product: product,
        quantity: prevQuantity + qty
      }));
    }
  }

  return (
    (
      <div className="flex-col flex items-center relative bg-gray-200 dark:bg-black gap-8 p-2 text-black dark:text-white font-normal uppercase text-sm h-full border-black my-2 justify-center w-full">
        <h1 className="text-xl font-bold">Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (

            <div className="flex justify-between items-center bg-gray-200 p-2" key={item.product.id}>
              <div className="flex gap-4">
                <img src={item.product.image} alt={item.product.title} className="rounded-md h-16 bg-white w-16" />
                <div className="flex flex-col w-24">
                  <h1 className="text-xs font-bold">{item.product.title}</h1>
                  <p className="text-xs text-gray-600">{toRupiah(item.product.price - 1000)}</p>
                </div>
              </div>
              <div className="flex gap-4 mx-2">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    handleUpdateItem(item.product, 1)
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    handleUpdateItem(item.product, -1)
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    handleUpdateItem(item.product, 0)
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Total: {toRupiah(totalPrice)}</h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 my-2"
                onClick={() => {
                  handleClearCart()
                }}
              >
                Clear cart
              </button>
              <Link to="/order">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                  Checkout
                </button>
              </Link>
            </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )
        }
      </div>
    )
  )
}

const mapStateToProps = state => ({
  cart: state.cart
});

/*export default connect(
  mapStateToProps,
  {clearCart,updateItem}
)(Cart);*/
export default Cart;