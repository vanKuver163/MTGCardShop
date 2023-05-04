import { TextBlock } from './TextBlock';
import { useCart } from "react-use-cart";
import useProducts from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { BsBrushFill, BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";



const CartItem = (products) => {      
    const { setLoadedProd } = useProducts();
    const { auth } = useAuth();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const goBack = () => navigate("/home");
    const indexOfLastProduct = products.currentPage * products.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - products.productsPerPage;
    const currentProducts = products.products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => products.setCurrentPage(pageNumber);

    function Pagination() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.products.length / products.productsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <nav>
                <ul className="ul">
                    {pageNumbers.map(number => (
                        <li className="ul_li" key={number}>
                            <Link to={`${products.routePagination}${number}`}
                                onClick={() => paginate(number)} className='ul_li_a'>{number}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }  

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
        <>
            <div className="div__container">
                <div className='div__tabel'>                
                    <h2 className="main__h2 animate">⭐Sail!⭐</h2>
                    <table className="table__container">
                        <tbody className="tbody__content">
                            {currentProducts.map((product) => (
                                <tr className="tbody__content" key={product.id}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='div__pagination'>{Pagination()}</div>
            </div>
        </>
    )
}

export default CartItem