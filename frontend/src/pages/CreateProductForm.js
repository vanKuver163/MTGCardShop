import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useCategories from '../hooks/useCategories';
import useProducts from '../hooks/useProducts';

const CreateProductForm = () => {
    const { categories } = useCategories();
    const { products } = useProducts();
    const { setLoadedProd } = useProducts();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    ////////////////////CREATE PRODUCTS//////////////////////////
    const [newProduct, setNewProduct] = useState('');
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        })
    };

    const handleChangeFile = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handlePick = () => {
        filePicker.current.click();
    }
    const handleSubmit = (e) => {
        if ((products.filter((product) => product.name === newProduct.name)).length !== 0) {
            alert(`Product with title - "${newProduct.name}" already exists.`);
            return;
        }

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('categoryid', newProduct.categoryid);
        formData.append('price', newProduct.price);
        formData.append('ImageUpload', selectedFile);



        const url = 'https://localhost:5001/admin/products';
        axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        onProductCreated(formData);
    };

    function onProductCreated(createdProduct) {
        if (createdProduct === null) {
            return;
        }
        alert(`Product "${newProduct.name}" successfully created.`);
        setNewProduct('');
        setSelectedFile(null);
        setLoadedProd(false);
        goBack();
    }

    return (
        <form className='addForm'>
            <h1>Create new product</h1>
            <div>
                <label htmlFor='name'>Product name</label>
                <input
                    className="input"
                    value={newProduct.name || ""}
                    autoFocus
                    id='name'
                    name="name"
                    type="text"
                    placeholder='add name'
                    required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='name'>Product category</label>
                <select className="select"
                    onChange={handleChange}
                    id="categoryid"
                    name="categoryid"
                    required
                >
                    <option className="options" value="0"></option>
                    {
                        categories
                            ? categories.map((category) => {
                                return <option className="options" key={category.id} value={category.id}>{category.name}</option>
                            })
                            : null
                    }
                </select>
            </div>
            <div>
                <label htmlFor='price'>Product price</label>
                <input
                    className="input"
                    value={newProduct.price || ''}
                    autoFocus
                    id='price'
                    name="price"
                    // type="number"
                    placeholder='add price'
                    required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='image'>Product image</label>
                <br />
                <button onClick={handlePick} className='button__submit'>Add image</button>
                {selectedFile && <label className="label_file">File: {selectedFile.name} </label>}
                <input
                    className="hidden_input"
                    type="file"
                    ref={filePicker}
                    accept="image/*,.png,.jpg,.gif,.web,"
                    required
                    onChange={handleChangeFile}
                />
            </div>
            <div>
                <button onClick={handleSubmit} type="button" className='button__submit'>Submit</button>
                <button onClick={goBack} type="button" className='button__cancel'>Cancel</button>
            </div>
        </form>
    )
}
export default CreateProductForm