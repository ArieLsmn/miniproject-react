//import StarRatings from "react-star-ratings";
import React from 'react'
import toRupiah from "./ToRupiah";
import { CartContext } from './CartContext';
import { Link } from "react-router-dom";

//const { cartItems, addToCart } = useContext(CartContext);

/*function discountPrice(price,discount){
return (
<>
<h2 className="text-sm font-semibold text-red-500">{toRupiah(price - discount - 1000)}</h2>
<h3 className="text-gray-500 line-through text-sm">{toRupiah(price - 1000)}</h3>

</>
);
};*/

function normalPrice(price) {

   return (
      <>
         <h2 className="text-sm font-semibold">{toRupiah(price - 1000)}</h2>
         <br></br>
      </>
   );
};

const ProductCard = ({ product, addProduct }) => {

   return (
      <div className="flex flex-col border rounded-lg m-1 bg-gray-200 justify-center p-4">

         <div className="justify-center h-40 w-40 bg-white">
            <img className="h-40 object-contain" src={product.image} />

         </div>
         <div className="flex flex-col">

            <h3 className="mb-2 text-sm"><a href=''>{product.title}</a></h3>
            <div className="text-sm">
               {normalPrice(product.price)}
            </div>

            <div className="mt-4">
               <a className="bg-red-500 text-center text-gray-100 p-2 hover:text-white hover:bg-gray-700 hover:cursor-pointer"
                  onClick={() => addProduct(product)}>Add to Cart</a>
            </div>
         </div>

      </div>
   );
};
export default ProductCard;