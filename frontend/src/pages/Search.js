import React, { useState, useEffect } from 'react'
import { TextBlock } from '../components/TextBlock';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Link } from 'react-router-dom';
import { BsBrushFill, BsTrash3Fill } from "react-icons/bs";
import '../style.css';

const Search = () => {
    const { slug } = useParams();
    const { products } = useProducts();
    const { auth } = useAuth();
    const { setLoadedProd } = useProducts();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const goBack = () => navigate("/home");
    const [product, setproduct] = useState(products.find(product => product.slug === slug));

    useEffect(() => {
        setproduct(products.find(product => product.slug === slug));
    }, [slug, products]);

    //////////////////DELETE PRODUCT/////////////////////
    function deleteProduct(id) {
        const url = `${'https://localhost:5001/admin/products'}/${id}`;
        fetch(url, { method: 'DELETE' })
            .then(() => {
                console.log('removed');
            }).catch(err => {
                console.error(err)
            });
        onProductDeleted(id);
    }

    function onProductDeleted(deletedProductId) {
        let productsCopy = products.products.find(product => product.id === deletedProductId);
        alert(`Category "${productsCopy.name}" successfully deleted.`);
        setLoadedProd(false);
        goBack();
    }

    return (
        <div className="div__container" >
            <div className='div__tabel'>
                <table className="table__container">
                    <tbody className="tbody__content">
                        <tr className="tbody__content">
                            <td className="table__item">
                                {product.name.length > 17 && <TextBlock text={product.name} size={20} />}
                                {product.name.length <= 17 && <TextBlock text={product.name} size={24} />}
                                <img className="img__isplayed" src={"https://localhost:5001//Images/" + product.image} alt="" />
                                <p>{product.price}</p>
                                {auth.roles === "admin"
                                    ?
                                    <div className="container__button">
                                        <Link to={`${"/admin/products"}/${product.slug}`} className="td_button"><BsBrushFill /> </Link>
                                        <button onClick={() => { if (window.confirm(`Are you sure want to delete the product titled "${product.name}"?`)) deleteProduct(product.id) }} className="td_button"><BsTrash3Fill /></button>
                                    </div>
                                    : <button className="container__button" onClick={() => addItem(product)}>Add to Card</button>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Search