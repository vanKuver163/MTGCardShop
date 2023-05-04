import React from 'react'
import { Link } from 'react-router-dom'

const AdminBar = () => {
    return (
        <div className="admin_bar">
            <Link to="/admin/categories/create_category" className="header__button__min">Add Category</Link>
            <Link to="/admin/products/create_product" className="header__button__min">Add Product</Link>
            <Link to="/admin/users" className="header__button__min">Users</Link>
        </div>
    )
}

export default AdminBar