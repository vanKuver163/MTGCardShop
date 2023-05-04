import React, { useState } from "react";
import "./SearchBar.css";
import Search from "@mui/icons-material/Search"
import Close from "@mui/icons-material/Close"
import { Link } from "react-router-dom";
import useProducts from '../hooks/useProducts';


function SearchBar({ placeholder}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { products } = useProducts();


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <Search />
          ) : (
            <Close id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((product) => {
            return (
              <Link to={`/search/${product.slug}`} key={product.id} onClick={clearInput} className="dataItem">
                <p>{product.name}</p>
              </Link>
            );
          })}
        </div>
      )}   
    </div>
  );
}

export default SearchBar;