
import React from 'react'
import { useState } from 'react'
import toRupiah from './ToRupiah'
import StarRatings from "react-star-ratings";


const ProductDetail = ({product,addToCart}) => {

    //const [clickState, setClickState] = useState("img1");
    const [imgState, setImgState] = useState(product.image);
    const [quantity, setQuantity] = useState(1);
    
    return (
        <>
        <div className="flex flex-row items-center pl-4">
            <a href="/">Product</a>{'>'}
            <a href="#">Mobile</a>{'>'}
            <a href="#">Smartphone</a>{'>'}
            <a href="#">{product.brand}</a>{'>'}
            <span tabindex="0">{product.title}</span>
      </div>
            <div className="w-11/12 m-auto shadow-xl">
                <div
                    className="flex lg:flex-row flex-col justify-items-center content-center align-middle items-center h-fit bg-white px-4 w-full">

                    <div className="flex lg:flex-col flex-row lg:w-1/2 lg:mx-auto p-8">
                        <div id="imgslider" className="flex w-full lg:h-96 justify-center lg:order-first order-last">
                            <div id="carousel_item" className="align-bottom max-w-md max-h-80">
                                <img id="imgview" src={imgState} className="lg:max-h-80" />
                            </div>

                        </div>
                        <div id="imgmini" className="flex lg:flex-row flex-col lg:flex-wrap my-1 lg:order-last order-first h-1/2">
                        {product.thumbs.map(thumb => (
                            <img onClick={() => { setImgState(thumb); }} src={thumb}
                                className={`max-w-24 cursor-pointer align-middle object-contain h-24 hover:border-solid border border-black rounded mx-2 ${(imgState === thumb) ? " border-solid" : " border-none"}`} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col min-h-96 shadow-xl lg:w-1/2 w-full lg:my-4 p-4">
                        <div className="mx-auto">
                            <div className="flex flex-col space-y-4 content-center p-4">
                                <h1 className="font-semibold text-xl">{product.title}</h1>
                                <div className="flex flex-row">
                                    <div className="mx-2">
                                        <StarRatings
                                        rating={product.rate}
                                        starDimension="16px"
                                        starSpacing="1px"
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                    />
                                    </div> {product.rate}
                                    <div className="border-x-2 mx-1 px-1">
                                        100 Penilaian
                                    </div>
                                    <div>100 Terjual
                                    </div>
                                </div>

                                <h2 className="font-bold text-2xl font-sans">{toRupiah(product.price-product.discount-1000)}</h2>
                                
                                <h2 className={`text-gray-500 text-lg line-through ${(product.discount<=100000) ? "hidden" : "flex"}`}>{toRupiah(product.price-1000)}</h2>
                                <div className="flex h-fit items-center">
                                    <h4>Warna: </h4>
                                    <div className="mx-2 justify-around space-x-2">
                                        <button
                                            className="bg-white text-center text-black p-2 hover:text-red-500 hover:border-red-500 border border-black border-solid"
                                            href="#">Hitam</button>
                                        <button
                                            className="bg-white text-center text-black p-2 hover:text-red-500 hover:border-red-500 border border-black border-solid"
                                            href="#">Putih</button>
                                    </div>
                                </div>
                                <div className="flex h-fit items-center">
                                    <h4>Varian:</h4>
                                    <div className="mx-2 justify-around space-x-2">
                                        <button
                                            className="bg-white text-center text-black p-2 hover:text-red-500 hover:border-red-500 border border-black border-solid"
                                            href="#">6/128 GB</button>
                                        <button
                                            className="bg-white text-center text-black p-2 hover:text-red-500 hover:border-red-500 border border-black border-solid"
                                            href="#">8/256 GB</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center">
                                <section className="flex items-center p-2">
                                    <h3>Kuantitas</h3>
                                    <div className="flex items-center">
                                    
                                        <button aria-label="Decrease" className="h-8 px-4 ml-2 text-sm text-gray-900 bg-gray-300 rounded-none"
                                            onClick={() => {setQuantity(quantity-1)}}>-</button>
                                          
                                        <input id="quantity" className="w-1/4 text-center border-gray-300 border-2 h-8" type="number" value={quantity} />
                                        <button aria-label="Increase" className="h-8 px-4 mr-2 text-sm text-gray-900 bg-gray-300 rounded-none"
                                            onClick={() => {setQuantity(quantity+1)}}>+</button>
                                    </div>
                                </section>
                                <div id="cart_bt" className="flex p-1 h-fit items-center">
                                    <a className="bg-red-500 text-center text-gray-100 p-2 hover:text-white hover:bg-gray-700"
                                        onClick={()=>addToCart(product,quantity)}>Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col content-center w-11/12 mx-auto shadow-xl my-5 p-4  bg-white">
                <span className="flex p-4 bg-gray-100 w-full">Informasi Produk</span>
                <div className="flex p-6 flex-col bg-white">
                    <h4>Kategori:</h4>
                    <h4>Stok:</h4>
                    <h4> Dikirim dari:</h4>
                </div>
                <span className="flex p-4 bg-gray-100 w-full">Deskripsi Produk</span>
                <div className="flex p-6 flex-col bg-white">
                    
                <pre>
                        {product.desc}
                    </pre>
                    <div className="flex flex-row justify-center content-center">
                        
                    </div>
                </div>
            </div>

            <div className="flex flex-col content-center w-11/12 mx-auto shadow-xl my-5 p-4  bg-white">
                Penilaian & Review

            </div>
        </>
    );
};

export default ProductDetail;