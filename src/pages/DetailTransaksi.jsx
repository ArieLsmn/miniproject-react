import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from "react";



function DetailTransaksi() {

    const { state } = useLocation();
    //console.log(state);
    let transaksi=state;
    let { paramId } = useParams();
    //const dispatch = useDispatch(); 
    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/pos/api/listtransaksidetail/${paramId}`).then((response) => {
            console.log(response.data);
            setDataState(response.data);
        }).catch((error) => { console.log(error); });
    }, []);
    const DisplayData = dataState.map(
        (info) => {
            return (
    
                <tr className="border-b text-center" key={info.id}>
                    <td className="p-4">{info.id}</td>
                    <td className="min-w-24">{info.transaction_id}</td>
                    <td className="min-w-24">{info.product_id}</td>
                    <td className="min-w-24">{info.product_name}</td>
                    <td className="min-w-24">{info.product_price}</td>
                    <td className="min-w-24">{info.quantity}</td>
                    <td className="min-w-24">{info.subtotal}</td>
                </tr>
            )
        }
    )
    return (
        
        <div className="flex flex-col">
            <div className="flex flex-col justify-start text-left">
                <div className="flex flex-row justify-between">
            <h1>Detail Transaksi</h1>
                    <Link to="/transaksi">
                        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
                            Kembali
                        </button>
                    </Link>
                    </div>

            <div className="flex flex-col border-t-2 gap-4">
                <table>
            <tr>
            <td>ID: </td> <td>{transaksi.id}</td>
            </tr>
            <tr>
            <td>Date:</td> <td>{transaksi.transaction_date}</td>
            </tr>
            <tr>
            <td>Total Harga:</td> <td>{transaksi.total_amount}</td>
            </tr>
            <tr>
            <td>Total Bayar:</td> <td>{transaksi.total_pay}</td>
            </tr>
            </table>
            </div>
            </div>
            <br></br>
            <div className="flex border-t-2">
            <table className="table-auto bg-white my-10 mx-auto">
                    <thead className="bg-gray-300 h-10 min-w">
                        <tr className="p-4">
                            <th className="min-w-10">Id</th>
                            <th className="min-w-24">Tr Id</th>
                            <th className="min-w-24">Pr Id</th>
                            <th className="min-w-24">Product</th>
                            <th className="min-w-24">Price</th>
                            <th className="min-w-24">Quantity</th>
                            <th className="min-w-24">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </table>
                </div>
        </div>
        
    );
}
export default DetailTransaksi;