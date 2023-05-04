import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useCategories from '../hooks/useCategories';



const CreateCategoryForm = () => {
    const { categories } = useCategories();
    const { setLoaded } = useCategories();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    //////////////CREATE CATEGORY/////////////////////
    const [newCategory, setNewCategory] = useState("");
    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setNewCategory({
            ...newCategory,
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
        if ((categories.filter((category) => category.name === newCategory.name)).length !== 0) {
            alert(`Category with title - "${newCategory.name}" already exists.`);
            return;
        }
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('sorting', newCategory.sorting);
        formData.append('file', selectedFile);

        const url = 'https://localhost:5001/admin/categories';
        axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        onCategoryCreated(formData);
    };

    function onCategoryCreated(createdCategory) {
        if (createdCategory === null) {
            return;
        }
        alert(`Category "${newCategory.name}" successfully created.`);
        setNewCategory('');
        setSelectedFile(null);
        setLoaded(false);
        goBack();
    }

    return (
        <form className='addForm'>
            <h1>Create new category</h1>
            <div>
                <label htmlFor='name'>Category name</label>
                <input
                    className="input"
                    value={newCategory.name || ""}
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
                <label htmlFor='sorting'>Category sorting</label>
                <input
                    className="input"
                    value={newCategory.sorting || ""}
                    autoFocus
                    id='sorting'
                    name="sorting"
                    type="number"
                    placeholder='add number'
                    required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='image'>Category image</label>
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

export default CreateCategoryForm