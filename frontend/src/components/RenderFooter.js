import React from 'react'
import '../style.css';

const RenderFooter = () => { 
    const today = new Date(); 
    return (
      <footer className ="footer">
      <p>
        <span className ="nowrap">Copyright &copy; {today.getFullYear()} </span>
        <span className ="nowrap">MTG Card Shop</span>
      </p>
    </footer>    
  )
}

export default RenderFooter