
import { Link } from 'react-router-dom';
import logo from '../img/mtg_logo.jpg';
import SearchBar from './SearchBar';
import '../style.css';

const Header = () => {

  return (
    <header className="header">    
     <Link to={'/home'} className="header__img">
     <img src={logo} alt="mtg_logo" title="MTG Logo" />
    </Link>    
   <button className="header__button">Login</button>
   <h1 className="header__h1">MTG Card Shop</h1>   
   <SearchBar placeholder={"Enter a Card Name"} /> 
  </header>  
  )
}

export default Header