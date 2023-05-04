import { Link } from 'react-router-dom';
import Cart from './Cart'
import '../style.css';
import useCategories from '../hooks/useCategories';
import { BsBrushFill, BsTrash3Fill } from "react-icons/bs"
import useAuth from '../hooks/useAuth';

const RenderAside = () => {

  const { categories } = useCategories();
  const { auth } = useAuth();
  const { setLoaded } = useCategories();

  // ///////////////DELETE CATEGORY/////////////////////
  function deleteCategory(id) {
    const url = `${'https://localhost:5001/admin/categories'}/${id}`;
    fetch(url, { method: 'DELETE' })

      .then(() => {
        console.log('removed');
      }).catch(err => {
        console.error(err)
      });
    onCategoryDeleted(id);
  }

  function onCategoryDeleted(deletedCategoryId) {
    let categoriesCopy = categories.find(category => category.id === deletedCategoryId);
    alert(`Category "${categoriesCopy.name}" successfully deleted.`);
    setLoaded(false);
  }

  return (
    <aside className="aside">
      {categories.map((category) => (
        <ul key={category.id}>
          {auth.roles === "admin"
            &&
            <div className="button_div">
              <Link to={`/admin/categories/${category.slug}`} className="td_button_min"><BsBrushFill /> </Link>
              <button onClick={() => { if (window.confirm(`Are you sure want to delete the category titled "${category.name}"?`)) deleteCategory(category.id) }} className="td_button_min"><BsTrash3Fill /></button>
            </div>
          }
          <li className="aside__li"><img alt='' src={"https://localhost:5001//Images/" + category.image} />
            <Link to={`/category/${category.slug}`} className='aside__a'>{category.name}</Link>
          </li>
        </ul>
      ))}
      {auth.roles === "user" &&
        <div>
          <Cart />
          <div className="aside__li">
            <Link to="/basket" className='aside__a'>Basket</Link>
          </div>
        </div>
      }

    </aside>
  )
}
export default RenderAside