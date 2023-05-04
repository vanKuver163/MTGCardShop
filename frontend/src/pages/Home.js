import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useProducts from '../hooks/useProducts';




const Home = () => {  
  const {products} = useProducts(); 

  const { id } = useParams(); 
  const [routePagination] = useState('/home/');
  const [productsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState((id === undefined) ? 1 : id); 

  return (   
    <>
      <CartItem products={products}
        routePagination={routePagination}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}           
      />
    </>   
  )
}
export default Home