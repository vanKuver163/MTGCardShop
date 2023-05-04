import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem';
import { useParams } from 'react-router-dom';
import '../style.css';

const Category = () => {
  const { slug } = useParams();
  const { id } = useParams();
  const [routePagination, setroutePagination] = useState(`/category/${slug}/`);
  const [currentPage, setCurrentPage] = useState((id === undefined) ? 1 : id);
  const [productsPerPage] = useState(3);

  ////////////////////GET PRODUCTS BY CATEGORY//////////////////////////
  const [products, setproducts] = useState([]);
  function getProducts() {
    const url = `https://localhost:5001/home/products/${slug}`;

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
  }

  useEffect(() => {
    getProducts();
    setroutePagination(`/category/${slug}/`);
    setCurrentPage(1);
  }, [slug]);

  return (
    <CartItem
      products={products}
      routePagination={routePagination}
      productsPerPage={productsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default Category