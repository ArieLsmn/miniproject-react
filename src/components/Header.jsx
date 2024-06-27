import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom';


const Header = () => {


    return (
        <header>
            

            <div className="w-full shadow-md content-center">
                <div className="flex flex-row bg-sky-950 text-white justify-around p-4 w-full">

                    <div className="overflow-x-hidden h-fit w-3/4 ">
                        <nav className="justify-evenly">
                            <ul className="lg:flex hidden flex-row justify-evenly w-full text-center content-center">
                                <li><Link to="/"><a>Home</a></Link></li>
                                <li><Link to="/listproduk"><a>Products</a></Link></li>
                                <li><Link to="/transaksi"><a>Transactions</a></Link></li>
                                <li><Link to="/listkategori"><a>Categories</a></Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;