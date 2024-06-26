import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from "react";


function DetailProduk() {
    let { paramId } = useParams();
 
    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/pos/api/detailproduct/${paramId}`).then((response) => {
            console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }, []);

    return (
        <div className="text-left">
            <div className="flex flex-row justify-between">
            <h1>Detail Produk</h1>
            <Link to="/listproduk">
                <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
                    Kembali
                </button>
            </Link>
            </div>
            <div className="flex flex-row justify-between border-t-2">

                <div className="flex flex-col">

                    <div className="flex flex-col gap-4 text-left">
                        <table>
                            <tr>
                                <td>ID: </td> <td>{dataState.id}</td>
                            </tr>
                            <tr>
                                <td>Nama:</td> <td>{dataState.title}</td>
                            </tr>
                            <tr>
                                <td>Harga:</td> <td>{dataState.price}</td>
                            </tr>
                            <tr>
                                <td>URL Gambar:</td> <td>{dataState.image}</td>
                            </tr>
                            <tr>
                                <td>ID Kategori:</td> <td>{dataState.category_id}</td>
                            </tr>
                            <tr>
                                <td>Nama Kategori:</td> <td>{dataState.category_name}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="justify-center">
                    <img className="h-72" src={dataState.image}></img>
                </div>
            </div>
        </div>
    );
}
export default DetailProduk;