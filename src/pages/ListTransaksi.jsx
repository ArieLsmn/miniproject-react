import React from 'react'
import { useState, useEffect } from 'react'



import 'src/App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"


function ListTransaksi() {
    //const dispatch = useDispatch();
    //const navigate = useNavigate();
    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/pos/api/listtransaksi').then((response) => {
            console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }, []);

    const DisplayData = dataState.map(
        (info) => {
            return (

                <tr className="border-b text-center" key={info.id}>
                    <td className="p-4">{info.id}</td>
                    <td className="min-w-24">{info.transaction_date}</td>
                    <td className="min-w-24">{info.total_amount}</td>
                    <td className="min-w-24">{info.total_pay}</td>
                    <td className="min-w-24"><Link to={`/transaksidetail/${info.id}`} state={info} >
                    <button className="bg-gray-800 text-white text-xs p-2">Detail</button></Link></td>
                </tr>
            )
        }
    )
    return (
        <>
            <div>
                <div className="flex flex-row text-left justify-between">
                <h1 className="font-bold text-2xl">Transaksi</h1>
                <Link to="/">
                    <button className="bg-gray-800 text-white text-xs p-2">
                        To Home
                    </button>
                </Link>
                </div>
                <div className="flex">

                    <table className="table-auto bg-white my-10 mx-auto w-full">
                        <thead className="bg-gray-300 h-10 min-w">
                            <tr className="p-4">
                                <th className="min-w-10">Id</th>
                                <th className="min-w-24">Date</th>
                                <th className="min-w-24">Harga</th>
                                <th className="min-w-24">Bayar</th>
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
export default ListTransaksi;