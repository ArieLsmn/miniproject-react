import React from 'react'
import { useState, useEffect } from 'react'
import 'src/App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"


function ListProduct() {

    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/pos/api/listproduct').then((response) => {
            console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }, []);

    const DisplayData = dataState.map(
        (info) => {
            return (

                <tr className="border-b text-center" key={info.id}>
                    <td className="p-4">{info.id}</td>
                    <td className="min-w-24">{info.title}</td>
                    <td className="min-w-24">{info.price}</td>
                    <td className="min-w-24">{info.category_id}</td>
                    <td className="min-w-24"><Link to={`/detailproduk/${info.id}`}><button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">Detail</button></Link>
                        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">Edit</button><button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">Delete</button></td>
                </tr>
            )
        }
    )
    return (
        <>
            <div>
                <div className="flex text-left">
                <h1>Product</h1>
                    <Link to="/">
                        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
                            To Home
                        </button>
                    </Link>
                    <Link to="/formproduk">
                        <a className="text-center bg-gray-300 p-2 hover:text-white hover:bg-gray-700"
                        >Add Product</a>
                    </Link>
                </div>
                <div className="flex border-t-2 my-2">

                    <table className="table-auto bg-white my-10 mx-auto">
                        <thead className="bg-gray-300 h-10 min-w">
                            <tr className="p-4">
                                <th className="min-w-10">Id</th>
                                <th className="min-w-24">Nama</th>
                                <th className="min-w-24">Harga</th>
                                <th className="min-w-24">Kategori</th>
                                <th className="min-w-24">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayData}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
export default ListProduct;