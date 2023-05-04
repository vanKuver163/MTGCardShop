import { useParams } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';


const UpdateProductForm = () => {
 const { slug } = useParams();
 const { categories } = useCategories();
 const { products } = useProducts();
 const { setLoadedProd } = useProducts();
 const [updatedProduct, setUpdatedProduct] = useState(products.find(product => product.slug === slug));
 const navigate = useNavigate();
 const goBack = () => navigate("/home");

//////////////////UPDATE PRODUCT/////////////////////

const filePickerUpdate = useRef(null);
const [selectedFileUpdate, setSelectedFileUpdate] = useState(null);

const handleUpdate = (e) => {  
  setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
  }) 
};

const handleUpdateFile = (e) => {
  setSelectedFileUpdate(e.target.files[0]);
};

const handlePickUpdate = () => {
  filePickerUpdate.current.click();
}

const handleSubmitUpdate = (e) => {   
  if ((products.filter((product) => product.name === updatedProduct.name && product.categoryid === updatedProduct.categoryid && product.price === updatedProduct.price)).length !== 0) 
  {    
    alert(`Product with title - "${updatedProduct.name}" already exists.`);
    return;
  }

  const formDataUpdate = new FormData(); 
  formDataUpdate.append('id', updatedProduct.id);
  formDataUpdate.append('name', updatedProduct.name);
  formDataUpdate.append('categoryid', updatedProduct.categoryid);
  formDataUpdate.append('price', updatedProduct.price);
  formDataUpdate.append('ImageUpload', selectedFileUpdate); 

  const url = 'https://localhost:5001/admin/products';
    axios.put(url, formDataUpdate, {headers: {"Content-Type": "multipart/form-data"}})
    .then((response) => response.json())
       .then((data) => {
           console.log(data);
      })
      .catch((err) => {
           console.log(err.message);
    });   
    onProductUpdated(formDataUpdate);
}

function onProductUpdated(formData) {
  setUpdatedProduct(null);
   if (formData === null) {
     return;
   }    
alert(`Product "${updatedProduct.name}" successfully updated.`);
  
  setUpdatedProduct('');
  setSelectedFileUpdate(null);
  setLoadedProd(false);
  goBack();         
}
    return(
        <form className='addForm'>
        <h1>Update product {updatedProduct.name}</h1> 
        <div>
            <label htmlFor='name'>Product name</label>            
            <input   
            className="input"         
            defaultValue={updatedProduct.name}
            autoFocus
            id='name'
            name="name"
            type="text"          
            required            
            onChange={handleUpdate}
            /> 
        </div>  
        <div>
            <label htmlFor='name'>Product category</label>
            <select className="select"
             onChange={handleUpdate}
             id="categoryid"
             name="categoryid"
             required            
             >
                 <option className="options" value="0"></option> 
                {
                    categories 
                    ? categories.map((category) => {
                        return <option className="options" key={category.id} value={category.id}>{category.name}</option>
                    })
                    : null
                }
            </select>
        </div> 
        <div>
            <label htmlFor='name'>Product price</label>            
            <input 
            className="input"         
            autoFocus
            id='price'
            name="price"              
            required            
            onChange={handleUpdate}
            /> 
        </div> 
        <div>
            <label htmlFor='image'>Product image</label> 
            <br/>           
            <button onClick={handlePickUpdate} className='button__submit'>Add image</button>
            {selectedFileUpdate && <label className="label_file">File: {selectedFileUpdate.name} </label> }     
            <input 
            className="hidden_input"         
            type="file"
            ref={filePickerUpdate}
            accept="image/*,.png,.jpg,.gif,.web,"
            required     
            onChange={handleUpdateFile}
            />              
        </div>
        <div>
            <button onClick={handleSubmitUpdate}  type="button"  className='button__submit'>Submit</button>
            <button onClick={goBack} type="button" className='button__cancel'>Cancel</button>
        </div>   

        </form>
    )
}
export default UpdateProductForm
