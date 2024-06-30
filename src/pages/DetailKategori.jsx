import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from "react";


function DetailKategori() {
    let { paramId } = useParams();
 
    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/pos/api/category/${paramId}`).then((response) => {
            console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }, []);

    return (
        <div className="text-left">
            <div className="flex flex-row justify-between">
        <h1>Detail Kategori</h1>
        <Link to="/listkategori">
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
                            <td>Nama:</td> <td>{dataState.name}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Produk:</td> <td>{dataState.product_count}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="justify-center">

            </div>
        </div>
        </div>
    );
}
export default DetailKategori;