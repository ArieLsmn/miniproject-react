import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from 'axios';
import { Link } from 'react-router-dom';



function CategoryForm() {

  //const [idState, setIdState] = useState(0);
  const [formData, setFormData] = useState(
    {
      name: "",
    }
  );


  const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(5, "Name too short"),
  });
  const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitForm = (data) => {
    console.log(data);
    alert(`Entered Data: 
    Product name: ${data.name}`
    );
    axios.post("http://localhost:8080/pos/api/addcategory", data).then(() => {
      reset();
    })
      .catch((error) => {
        console.log("Error", error);
      });
  };


  return (
    <>
<h1>Form Kategori</h1>
    <Link to="/">
        <button className="bg-gray-800 text-white text-xs p-2 hover:text-white hover:bg-gray-700 mx-2">
            To Home
        </button>
    </Link>
      <div className="flex flex-col justify-center w-1/2 bg-white border p-4 mx-auto">

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='flex flex-col space-y-4'>
            <label>Category Name:</label>
            <div>
              <input className='border-2 border-gray-300 p-2 w-full'
                placeholder="Required"
                {...register("name")}
                name="name"
                id="name"
                type="text"

              />
              <p className="text-red-500">{errors.title?.message}</p>
            </div>
            
          </div>


          <button className="my-2" type="submit" value="submit">Submit</button>

        </form>
      </div>
    </>
  )
}

export default CategoryForm;