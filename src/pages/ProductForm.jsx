import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from 'axios';
import { Link } from 'react-router-dom';



function ProductForm() {

  //const [idState, setIdState] = useState(0);
  const [catData, setCategory] = useState([]);
  const [formData, setFormData] = useState(
    {
      title: "",
      price: 0,
      image: "",
      category_id: 0,
    }
  );

  useEffect(() => {
    axios.get(`http://localhost:8080/pos/api/listcategory`).then((response) => {
      setCategory(response.data);
      console.log(catData);
    });
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("Name is required").min(5, "Name too short"),
    price: yup.number().required("Price is required").min(1000, "Invalid price"),
    category_id: yup.string().required("Category is required"),
    image: yup.string().required("Image is required"),
  });
  const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitForm = (data) => {
    console.log(data);
    alert(`Entered Data: 
    Product name: ${data.title}
    Price: ${data.price}
    Category: ${data.category_id}
    Image URL: ${data.image}`
    );
    axios.post("http://localhost:8080/pos/api/addproduct", data).then(() => {
      reset();
    })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const DisplayOption = catData.map(
    (info) => {
      return (
        <option value={info.id}>{info.name}</option>
      )
    }
  );

  return (
    <>
      <h1>Form Produk</h1>
      <Link to="/listproduk">
        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
          Kembali
        </button>
      </Link>
      <div className="flex flex-col justify-center w-1/2 bg-white border p-4 mx-auto">

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='flex flex-col space-y-4'>
            <label>Product Name:</label>
            <div>
              <input className='border-2 border-gray-300 p-2 w-full'
                placeholder="Required"
                {...register("title")}
                name="title"
                id="title"
                type="text"

              />
              <p className="text-red-500">{errors.title?.message}</p>
            </div>
            <label>Price:</label>
            <div>
              <input className='border-2 border-gray-300 p-2 w-full'
                {...register("price")}
                name="price"
                id="price"
                type="number"

              />
              <p className="text-red-500">{errors.price?.message}</p>
            </div>
            <label>Category:</label>
            <div>
              <select className='border-2 border-gray-300 p-2 w-full'
                placeholder="Required"
                {...register("category_id")}
                name="category_id"
                id="category_id">
                {DisplayOption}
              </select>
              <p className="text-red-500">{errors.category?.message}</p>
            </div>

            <label>Image URL:</label>
            <div>
              <input className='border-2 border-gray-300 p-2 w-full'
                {...register("image")}
                name="image"
                id="image"
                type="text"

              />
            </div>
          </div>


          <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 my-2" type="submit" value="submit">Submit</button>

        </form>
      </div>
    </>
  )
}

export default ProductForm;