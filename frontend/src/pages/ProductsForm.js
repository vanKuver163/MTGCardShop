import React, { useState } from 'react'
import Pagination from '../components/Pagination';
import { BsBrushFill, BsTrash3Fill} from "react-icons/bs"
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';



const ProductsForm = ()=>{  
  const products = useProducts();
  const setproducts = useProducts();
  const categories = useCategories();
  const setLoadedProd = useProducts();
 

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(products);
  console.log(currentProducts);

  ////////////////////SEARCH CATEGORIES//////////////////////////
  function searchCategory(categoryId)
  {
      const category = categories.categories?.find((c)=>c.id === categoryId);
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

  //////////////////DELETE PRODUCT/////////////////////
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
    let productsCopy = products.find(product => product.id === deletedProductId);
    alert(`Category "${productsCopy.name}" successfully deleted.`);
    setLoadedProd(false);          
    // let productCopy = [...products];
  
    // const index = productCopy.findIndex((productsCopyPage, currentIndex) => {
    //     if (productsCopyPage.id === deletedProductId){
    //       return true;
    //     }
    // });
    // // if(index !== -1){
    // //   pagesCopy.splice(index, 1);
    // // }
    // // setPages(pagesCopy);  
    // alert(`Product "${productCopy.name}" successfully deleted.`);
    // getProducts();  
  }

    
    return(
        <div>
            <table className="table">
            <caption className="table_caption_top">All cards</caption>
            <thead>
            <tr>         
              <th className="table__head__cell_active" onClick={()=>sortingName("name")} scope='col'>Name</th>
              <th className="table__head__cell" scope='col'>Category</th>
              <th className="table__head__cell_active" scope='col' onClick={()=>sortingPrice("price")}>Price</th>             
              <th className="table__head__cell" scope='col'>Image</th>
              <th className="table__head__cell" scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
          {currentProducts.map((product) =>(
             <tr key={product.id}>
                <td className="table__body__cell">{product.name}</td>              
                <td className="table__body__cell">{searchCategory(product.categoryId)}</td>  
                <td className="table__body__cell">{product.price}</td>           
                <td className="table__body__cell"><img className="td_img_product" alt='' src={"https://localhost:5001//Images/" + product.image}/></td>            
                <td className="table__body__cell">
                  <button onClick={()=>{}} className="td_button"><BsBrushFill/> </button>                     
                  <button onClick={()=>{ if(window.confirm(`Are you sure want to delete the product titled "${product.name}"?`)) deleteProduct(product.id)}} className="td_button"><BsTrash3Fill/></button> 
                </td>  
             </tr>
          ))}
          </tbody>     
          <caption className="table_caption_bottom"><button onClick={()=>{}} className="td_button_bottom">+</button></caption> 
         </table>
         <Pagination
            productsPerPage = {productsPerPage}
            totalProducts = {products.products.length}
            paginate = {paginate}
          />
        </div>
    )
}

export default ProductsForm