import { createContext, useState, useEffect} from "react";

const CategoriesContext = createContext({});

export const CategoriesProvider = ({ children }) => {
    const [categories, setcategories] = useState([]);
    const [loaded, setLoaded] = useState(false);

    ////////////////////GET CATEGORIES//////////////////////////  
    function getCategories() {
        const url = 'https://localhost:5001/admin/categories';

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
    useEffect(() => {
        if(loaded) return;
        getCategories();
        setLoaded(true);
    }, [loaded]);

    return (
        <CategoriesContext.Provider value={{ categories, setcategories, setLoaded }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesContext;