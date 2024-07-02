import React from 'react'
import { useState, useEffect } from 'react'
import 'src/App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"
import { data } from 'autoprefixer';


function ListCategory() {

    const [dataState, setDataState] = useState([]);
    //const [rerenderState, setRerender] = useState(false);
    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get('http://localhost:8080/pos/api/listcategory').then((response) => {
            //console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }

    function handleDelete(id) {
        if (confirm('Confirm delete?')) {
            // Save it!
            //console.log('Thing was saved to the database.');
            axios.delete(`http://localhost:8080/pos/api/deletecategory/${id}`).then((response) => {
                //console.log(response.data);
                if (response.data.status = 'FORBIDDEN') alert("Data cant be deleted");
                getData();

            }).catch((error) => { console.log(error); });
        } else { }

    }


    const DisplayData = dataState.map(
        (info) => {
            return (

                <tr className="border-b text-center" key={info.id}>
                    <td className="p-4">{info.id}</td>
                    <td className="min-w-24">{info.name}</td>
                    <td className="min-w-24">{info.product_count}</td>
                    <td className="min-w-24"><Link to={`/detailkategori/${info.id}`}><button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">Detail</button></Link>

                        <Link to={`/updatekategori/${info.id}`}>
                            <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2"
                            >Edit</button></Link>
                        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2"
                            onClick={() => { handleDelete(info.id) }}
                        >Delete</button>
                    </td>
                </tr>
            )
        }
    )
    return (
        <>
            <div>


                <div className="flex text-left mx-4 px-4 justify-between">
                    <h1 className="font-bold text-2xl"> Kategori </h1>
                    <div>
                    <Link to="/">
                        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
                            To Home
                        </button>
                    </Link>
                    <Link to="/formkategori">
                        <button className="text-center bg-gray-300 p-2 hover:text-white hover:bg-gray-700 text-xs"
                        >Add Category</button>
                    </Link>
                    </div>
                </div>
                <div className="flex border-t-2 my-2">

                    <table className="table-auto bg-white my-10 mx-auto">
                        <thead className="bg-gray-300 h-10 min-w">
                            <tr className="p-4">
                                <th className="min-w-10">Id</th>
                                <th className="min-w-24">Nama</th>
                                <th className="min-w-24">Jumlah Produk</th>
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
export default ListCategory;