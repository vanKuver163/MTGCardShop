import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import Layout from './components/Layout';
import Category from './pages/Category';
import Search from './pages/Search';
import Basket from './pages/Basket';
import Register from './components/Register';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import CategoriesForm from './pages/CategoriesForm';
import CreateCategoryForm from './pages/CreateCategoryForm';
import UpdateCategoryForm from './pages/UpdateCategoryForm';
import CreateProductForm from './pages/CreateProductForm';
import UpdateProductForm from './pages/UpdateProductForm';
import Users from './components/Users';


const ROLES = {
  'User' : "user",
  'Admin' : "admin"
}

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* public routes */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* protected user routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="home/:id" element={<Home />} />            
              <Route path="category/:slug" element={<Category />} />
              <Route path="category/:slug/:id" element={<Category />} />
              <Route path="search/:slug" element={<Search />} />
              <Route path="basket" element={<Basket />} />
            </Route>

            {/* protected admin routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>                              
                <Route path="admin/categories" element={<CategoriesForm />} />
                <Route path="admin/categories/:slug" element={<UpdateCategoryForm />} />
                <Route path="admin/categories/create_category" element={<CreateCategoryForm />} />             
                <Route path="admin/products/:slug" element={<UpdateProductForm />} /> 
                <Route path="admin/products/create_product" element={<CreateProductForm />} /> 
                <Route path="admin/users" element={<Users />} /> 

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
