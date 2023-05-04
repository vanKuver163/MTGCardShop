import { BsBrushFill, BsTrash3Fill } from "react-icons/bs"
import { Link } from "react-router-dom";
import useCategories from '../hooks/useCategories';

const CategoriesForm = () => {
  const { categories } = useCategories();
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
    <div>
      <table className="table">
        <caption className="table_caption_top">All categories</caption>
        <thead>
          <tr>
            <th className="table__head__cell" scope='col'>Name</th>
            <th className="table__head__cell" scope='col'>Slug</th>
            <th className="table__head__cell" scope='col'>Sorting</th>
            <th className="table__head__cell" scope='col'>Image</th>
            <th className="table__head__cell" scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="table__body__cell">{category.name}</td>
              <td className="table__body__cell">{category.slug}</td>
              <td className="table__body__cell">{category.sorting}</td>
              <td className="table__body__cell"><img alt="" className="td_img" src={"https://localhost:5001//Images/" + category.image} /></td>
              <td className="table__body__cell">
                <Link to={`${category.slug}`} className="td_button"><BsBrushFill /> </Link>
                {<button onClick={() => { if (window.confirm(`Are you sure want to delete the category titled "${category.name}"?`)) deleteCategory(category.id) }} className="td_button"><BsTrash3Fill /></button>}
              </td>
            </tr>
          ))}
        </tbody>
        <caption className="table_caption_bottom"><Link to="create_category" className="td_button_bottom">&nbsp;&nbsp;+&nbsp;&nbsp;</Link></caption>
      </table>
    </div>
  );
}

export default CategoriesForm
