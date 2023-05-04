import { useCart } from "react-use-cart";
import useProducts from '../hooks/useProducts';

const Basket = () => {
    const { items } = useCart();    
    const { products } = useProducts();   

    function getImage(itemName)
    {      
        const filteredItems = products.filter(product => product.name === itemName);   
        return filteredItems[0] ? filteredItems[0].image : null;
    }
    const total = items.reduce((accumulator, item) => accumulator + item.price, 0);   

    return (
        <div>
            <table className="table">
                <caption className="table_caption_top">All products</caption>
                <thead>
                    <tr>
                        <th className="table__head__cell" scope='col'>Name</th>
                        <th className="table__head__cell" scope='col'>Quantity</th>
                        <th className="table__head__cell" scope='col'>Price</th>
                        <th className="table__head__cell" scope='col'>Image</th>                        
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="table__body__cell">{item.name}</td>
                            <td className="table__body__cell">{item.quantity}</td>
                            <td className="table__body__cell">{item.price}</td>                  
                            <td className="table__body__cell"><img alt="" className="td_img_product"  src={"https://localhost:5001//Images/" + getImage(item.name)} /></td>                        
                        </tr>
                    ))}
                </tbody>
                 <caption className="table_caption_bottom">Total Price: {total}</caption> 
            </table>
        </div>
    )
}

export default Basket