import { Outlet } from 'react-router-dom';
import RenderHeader from './RenderHeader';
import RenderAside from './RenderAside';
import RenderFooter from './RenderFooter';
import { CartProvider } from "react-use-cart";
import useAuth from '../hooks/useAuth';
import AdminBar from './AdminBar';

const Layout = () => {
  const { auth } = useAuth();  

  return (
    <div className="App">
      <RenderHeader />
      <CartProvider>    
        <main>
         {auth.roles==='admin' && <AdminBar/> }
          <Outlet />
        </main>
        <RenderAside />
      </CartProvider>
      <RenderFooter />
    </div>
  )
}

export default Layout