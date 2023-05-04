import { createContext, useState, useEffect} from "react";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
    const [products, setproducts] = useState([]);
    const [loadedProd, setLoadedProd] = useState(false);


    ////////////////////GET CATEGORIES//////////////////////////    
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
      }


    useEffect(() => {
        if(loadedProd) return;
        getProducts();          
        setLoadedProd(true);
    }, [loadedProd]);

    return (
        <ProductsContext.Provider value={{ products, setproducts, setLoadedProd}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;