import {Link} from 'react-router-dom';

const Pagination = ({productsPerPage, totalProducts, paginate, routePagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }    

  return (
    <nav>
       <ul className="ul">
        {pageNumbers.map(number => (
            <li className="ul_li" key={number}>           
                 <Link to={`${routePagination}${number}`}                   
                 onClick={()=> paginate(number)} className='ul_li_a'>{number}
                 </Link> 
            </li>
        ))}
       </ul>
    </nav>
  )
}

export default Pagination