import React, { useState, useRef, useEffect, useContext} from 'react';
import axios from 'axios';
import ProductsForm from '../pages/ProductsForm';
import CreateProductForm from '../pages/CreateProductForm';
import UpdateProductForm from '../pages/UpdateProductForm';

import {Context} from './Global';

const FunctionalProduct = () => {

  const {showContext, setShowContext} = useContext(Context);
 
   ////////////////////GET CATEGORIES//////////////////////////
   const [categories, setcategories] = useState([]);


   function getCategories() {
     const url = 'https://localhost:5001/home';
 
     fetch(url, {
       method: 'GET'
     })
       .then(response => response.json())
       .then(categoriesFromServer => {
         setcategories(categoriesFromServer);
       })
       .catch((error) => {
         console.log(error);
         alert(error);
       });  
     }
     useEffect(()=>{
       getCategories();
     }, []);  
     
      ////////////////////SEARCH CATEGORIES//////////////////////////
     
     function searchCategory(categoryId)
     {
         const category = categories?.find((c)=>c.id === categoryId);
         return category.name;
     }

      ////////////////////SORTING PRODUCT//////////////////////////
     const[order, setorder] = useState("ASC");

     const sortingName = (col)=>
     {
       if (order === "ASC"){
         const sorted = [...products].sort((a, b)=>
         a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1
         );
         setproducts(sorted);
         setorder("DSC");
       }
       if (order === "DSC"){
         const sorted = [...products].sort((a, b)=>
         a[col].toLowerCase() < b[col].toLowerCase() ? 1: -1
         );
         setproducts(sorted);
         setorder("ASC");
       }
     }
 
     const sortingPrice = (col)=>
     {
       if (order === "ASC"){
         const sorted = [...products].sort((a, b)=>
         a[col] > b[col] ? 1: -1
         );
         setproducts(sorted);
         setorder("DSC");
       }
       if (order === "DSC"){
         const sorted = [...products].sort((a, b)=>
         a[col] < b[col] ? 1: -1
         );
         setproducts(sorted);
         setorder("ASC");
       }
     }



  ////////////////////GET PRODUCTS//////////////////////////
  const [products, setproducts] = useState([]);
  function getProducts() {
    const url = 'https://localhost:5001/admin/products';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(productsFromServer => {
        setproducts(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });  
      setShowContext('Product');
  }

////////////////////CREATE PRODUCTS//////////////////////////
const [newProduct, setNewProduct] = useState('');
const [showCreateNewProductForm, setshowCreateNewProductForm] = useState(false);
const filePicker = useRef(null);
const [selectedFile, setSelectedFile] = useState(null);

const handleChange = (e) => {  
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
  }) 
};

const handleChangeFile = (e) => {
setSelectedFile(e.target.files[0]);
};

const handlePick = () => {
filePicker.current.click();
}
const handleSubmit = (e) => {   
if ((products.filter((product) => product.name === newProduct.name)).length !== 0) 
{    
  alert(`Product with title - "${newProduct.name}" already exists.`);
  return;
}

const formData = new FormData(); 
formData.append('name', newProduct.name);
formData.append('categoryid', newProduct.categoryid);
formData.append('price', newProduct.price);
formData.append('ImageUpload', selectedFile); 



  const url = 'https://localhost:5001/admin/products';
  axios.post(url, formData, {headers: {"Content-Type": "multipart/form-data"}})
  .then((response) => response.json())
     .then((data) => {
         console.log(data);
    })
    .catch((err) => {
         console.log(err.message);
  });  
  onProductCreated(formData);
};

function onProductCreated(createdProduct) {
setshowCreateNewProductForm(false);
if (createdProduct === null) {
  return;
} 
alert(`Product "${newProduct.name}" successfully created.`);
getProducts();   
}

//////////////////UPDATE PRODUCT/////////////////////
const[updatedProduct, setUpdatedProduct] = useState(null);
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

function onProductUpdated(updatedCategory) {
  setUpdatedProduct(null);
   if (updatedCategory === null) {
     return;
   }    
  //  let pagesCopy = [...pages];
  //   const index = pagesCopy.findIndex((pagesCopyPage, currentIndex) => {
  //       if(pagesCopyPage.id === pageToUpdate.id){
  //         return true;
  //       }
  //   });
  //   if(index !== -1){
  //     pagesCopy[index] = pageToUpdate;
  //   }
  //   setPages(pagesCopy);
  setproducts(updatedCategory)
  alert(`Product "${updatedCategory.name}" successfully updated.`);
  getProducts();       
}

// ///////////////DELETE CATEGORY/////////////////////

function deleteProduct(id){

  const url = `${'https://localhost:5001/admin/products'}/${id}`;
  fetch(url, { method: 'DELETE' })
  .then(response=>response.json())
  .then(responseFromServer =>{
    console.log(responseFromServer);
    
  })
  onProductDeleted(id);   
}

function  onProductDeleted(deletedProductId){    
      
  let productCopy = [...products];

  const index = productCopy.findIndex((productsCopyPage, currentIndex) => {
      if (productsCopyPage.id === deletedProductId){
        return true;
      }
  });
  // if(index !== -1){
  //   pagesCopy.splice(index, 1);
  // }
  // setPages(pagesCopy);  
  alert(`Product "${productCopy.name}" successfully deleted.`);
  getProducts();  
}
    
 return (
    <div className="div_product">
    {     
         <button onClick={getProducts} className="header__button__min">Cards</button>           
    } 
        <div className="product">
        {(products.length > 0 && showCreateNewProductForm === false && showContext==='Product' && updatedProduct===null) &&
         <ProductsForm
          products = {products}
          categories = {categories}
          setshowCreateNewProductForm = {setshowCreateNewProductForm}
          setUpdatedProduct = {setUpdatedProduct}
          searchCategory = {searchCategory}
          deleteProduct = {deleteProduct} 
          sortingName = {sortingName}
          sortingPrice = {sortingPrice}
        />}        
        {(showCreateNewProductForm === true && showContext==='Product') &&
         <CreateProductForm 
         newProduct = {newProduct}        
         handleChange = {handleChange}
         handleChangeFile = {handleChangeFile}
         handleSubmit = {handleSubmit}
         filePicker = {filePicker}
         handlePick = {handlePick}
         selectedFile = {selectedFile}
         onProductCreated = {onProductCreated}         
         categories = {categories}    
         />}
         {(updatedProduct !==null && showContext === 'Product') &&
         <UpdateProductForm
         updatedProduct = {updatedProduct}
         handleUpdate = {handleUpdate}
         handleUpdateFile = {handleUpdateFile}
         handleSubmitUpdate = {handleSubmitUpdate}
         filePickerUpdate = {filePickerUpdate}
         handlePickUpdate = {handlePickUpdate}
         selectedFileUpdate = {selectedFileUpdate}
         onProductUpdated = {onProductUpdated} 
         categories = {categories}        
         searchCategory = {searchCategory}
         />}        
        </div>
    </div>  
 )
}
export default FunctionalProduct
