import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
//import { CartContext } from './CartContext'
import { useReducer } from 'react'
import { useSelector, connect, useDispatch } from "react-redux";
//import { updateCartItem,updateCartItemQuantity,clearCart,getCartTotal } from 'src/store/action/cartAction'
import { clearCart, addItem, updateItem, fillCart } from 'src/store/cartSlice';
import toRupiah from '../components/ToRupiah';
import { useNavigate } from 'react-router-dom';


function OrderList() {
  //const { dataCheckout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const [payState, setPayState] = useState(0);
  const [payButtonState, setPayButtonState] = useState(true);
  const navigate =useNavigate();

  let cartItems = items;
  console.log(cartItems);
  let totalPrice = 0;
  if (cartItems !== undefined && cartItems.length > 0) {
    cartItems.forEach(element => {
      //let disc = element.product.discount;
      totalPrice += (element.product.price) * element.quantity;
    });
  }


  let orders = [];

  cartItems.forEach(element => {
    let order =
    {
      product_id: element.product.id,
      quantity: element.quantity,
      subtotal: element.quantity * (element.product.price)
    };
    orders.push(order);
  });
  console.log(orders);
  const onSubmitForm = () => {
    let today = new Date().toJSON().slice(0, 10);
    let data =
    {
      //transaction_date: today,
      total_amount: totalPrice,
      total_pay: parseInt(payState),
      transaction_details: orders
    };
    console.log(data);
    axios.post("http://localhost:8080/pos/api/addtransaction", data).then(() => {
      //console.log("data");
      alert(`Pembayaran berhasil 
    Harga: ${data.total_amount}
    Pembayaran: ${data.total_pay}`);
      dispatch(clearCart());
      //reset();
      navigate("/");

    })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  function onPayChange(value) {
    setPayState(value);
  }
  function handleUpdateItem(product, qty) {
    let cart = cartItems;
    const item = cart.find(it => it.product.id == product.id);
    const prevQuantity = item ? item.quantity : 0;
    if (qty == 0) {//utk remove
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


  useEffect(() => {
    if (payState < totalPrice) setPayButtonState(true);
    else setPayButtonState(false);
  }, [payState]);


  return (
    (
      <div className="flex flex-row justify-between px-4">

        <div className="flex flex-col dark:bg-black gap-8 p-2 text-black dark:text-white font-normal uppercase text-sm h-full text-center mx-2 w-3/5">
          <h1 className="text-xl uppercase font-bold">Cart</h1>
          <div className="flex flex-col gap-4 items-center">
            {cartItems.map((item) => (

              <div className="flex justify-between items-center w-4/5" key={item.product.id}>
                <div className="flex gap-4">
                  <img src={item.product.image} alt={item.product.title} className="rounded-md h-24 w-28" />
                  <div className="flex flex-col">
                    <h1 className="text-sm font-bold">{item.product.title}</h1>
                    <p className="text-gray-600">{toRupiah(item.product.price)}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 mx-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      handleUpdateItem(item.product, 1)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-4 py-2 mx-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      handleUpdateItem(item.product, -1)
                    }}
                  >
                    -
                  </button>
                </div>
                <div>
                  <button
                    className="px-4 py-2 mx-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
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

        </div>
        <div className="flex flex-col w-1/5">
          PEMBAYARAN
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: {toRupiah(totalPrice)}</h1>

          </div>
          Total Pembayaran
          <input className="border-2 border-black" type="number" id="payment" name="payment" step="1000" onChange={e => onPayChange(e.target.value)}></input>
          Kembalian: {(payState > totalPrice) ? (payState - totalPrice) : 0}

          <button className={`px-4 py-2 text-white text-xs font-bold uppercase rounded ${(payButtonState) ? "bg-gray-500" : "hover:bg-gray-700 bg-sky-950 focus:outline-none focus:bg-gray-700"}`}
            disabled={payButtonState}
            onClick={() => { onSubmitForm() }}
          >Buat Pesanan
          </button>
        </div>
      </div>
    )
  )
}

export default OrderList;