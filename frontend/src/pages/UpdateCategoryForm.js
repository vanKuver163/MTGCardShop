import { useParams } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import useCategories from '../hooks/useCategories';

const UpdateCategoryForm = () => {
    const { slug } = useParams();
    const { setLoaded } = useCategories();
    const { categories } = useCategories();
    const [updatedCategory, setUpdatedCategory] = useState(categories.find(category => category.slug === slug));
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    //////////////////UPDATE CATEGORY/////////////////////   
    const filePickerUpdate = useRef(null);
    const [selectedFileUpdate, setSelectedFileUpdate] = useState(null);

    const handleUpdate = (e) => {
        setUpdatedCategory({
            ...updatedCategory,
            [e.target.name]: e.target.value,
        })
    };

    const handleUpdateFile = (e) => {
        setSelectedFileUpdate(e.target.files[0]);
    };

    const handlePickUpdate = () => {
        filePickerUpdate.current.click();
    }

    const handleSubmitUpdate = (e) => {
        if ((categories.filter((category) => category.name === updatedCategory.name && category.sorting === updatedCategory.sorting)).length !== 0) {
            alert(`Category with title - "${updatedCategory.name}" already exists.`);
            return;
        }

        const formDataUpdate = new FormData();
        formDataUpdate.append('id', updatedCategory.id);
        formDataUpdate.append('name', updatedCategory.name);
        formDataUpdate.append('sorting', updatedCategory.sorting);
        formDataUpdate.append('file', selectedFileUpdate);

        const url = 'https://localhost:5001/admin/categories';
        axios.put(url, formDataUpdate, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        onCategoryUpdated(formDataUpdate);
    }

    function onCategoryUpdated(formData) {
        if (formData === null) {
            return;
        }
        alert(`Category "${updatedCategory.name}" successfully updated.`);
        setUpdatedCategory('');
        setSelectedFileUpdate(null);
        setLoaded(false);
        goBack();
    }

    return (
        <form className='addForm'>
            <h1>Update category {updatedCategory.name}</h1>
            <div>
                <label htmlFor='name'>Category name</label>
                <input
                    className="input"
                    defaultValue={updatedCategory.name}
                    autoFocus
                    id='name'
                    name="name"
                    type="text"
                    placeholder='add name'
                    required
                    onChange={handleUpdate}
                />
            </div>
            <div>
                <label htmlFor='sorting'>Category sorting</label>
                <input
                    className="input"
                    defaultValue={updatedCategory.sorting}
                    autoFocus
                    id='sorting'
                    name="sorting"
                    type="number"
                    placeholder='add number'
                    required
                    onChange={handleUpdate}
                />
            </div>
            <div>
                <label htmlFor='image'>Category image</label>
                <br />
                <button onClick={handlePickUpdate} className='button__submit'>Add image</button>
                {selectedFileUpdate && <label className="label_file">File: {selectedFileUpdate.name} </label>}
                <input
                    className="hidden_input"
                    type="file"
                    ref={filePickerUpdate}
                    accept="image/*,.png,.jpg,.gif,.web,"
                    required
                    onChange={handleUpdateFile}
                />
            </div>
            <div>
                <button onClick={handleSubmitUpdate} type="button" className='button__submit'>Submit</button>
                <button onClick={goBack} type="button" className='button__cancel'>Cancel</button>
            </div>
        </form>
    )
}
export default UpdateCategoryForm