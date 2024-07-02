//import StarRatings from "react-star-ratings";
import React from 'react'
import toRupiah from "./ToRupiah";
import { CartContext } from './CartContext';
import { Link } from "react-router-dom";


function normalPrice(price) {

   return (
      <>
         <h2 className="text-sm font-semibold">{toRupiah(price)}</h2>
         <br></br>
      </>
   );
};

const ProductCard = ({ product, addProduct }) => {

   return (
      <div className="flex flex-col border rounded-lg m-1 bg-gray-200 justify-center p-4 max-w-40 h-72">

         <div className="justify-center h-32 w-32 bg-white">
            <img className="h-32 object-contain" src={product.image} />

         </div>
         <div className="flex flex-col">

            <h3 className="mb-2 text-sm"><a href=''>{product.title}</a></h3>
            <div className="text-sm">
               {normalPrice(product.price)}
            </div>

            <div className="mt-4">
               <a className="bg-red-500 text-center text-gray-100 p-2 hover:text-white hover:bg-gray-700 hover:cursor-pointer font-semibold"
                  onClick={() => addProduct(product)}>Add to Cart</a>
            </div>
         </div>

      </div>
   );
};
export default ProductCard;