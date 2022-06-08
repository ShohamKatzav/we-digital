import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';


export default function ManageCategories() {

    const Products = JSON.parse(localStorage.getItem("products"));
    const [Categories, SetCategories] = useState(JSON.parse(localStorage.getItem("categories")));
    const [editVal, SeteditVal] = useState(null);
    const [removeVal, SetremoveVal] = useState(null);

    useEffect(() => {
        SetCategories(JSON.parse(localStorage.getItem("categories")));
    }, []);

    const NotifySuccess = (message) => {
        toast.success(message);
    }

    const NotifyError = (message) => {
        toast.error(message);
    }

    const NotifyWarning = (message) => {
        toast.warning(message);
    }

    const handleCategoryToEditChanged = (selectedOption) => {
        document.getElementById("SelectCategoryToEdit").value = selectedOption.value;
        SeteditVal(selectedOption);
    }
    const handleCategoryToRemoveChanged = (selectedOption) => {
        document.getElementById("SelectCategoryToRemove").value = selectedOption.value;
        SetremoveVal(selectedOption);
    }

    const GetCategoryOptions = () => {
        let options = [];
        options[0] = {
            label: 'Categories',
            options:
                Array.from(Categories).map((category) =>
                    ({ value: category, label: category }))
        }
        return options;
    }
    const AddCategory = (e) => {
        e.preventDefault();
        let CategoryNameToAdd = String(document.getElementById("AddInput").value.trim());
        if (CategoryNameToAdd != null && CategoryNameToAdd !== "") {
            if (!Categories.includes(CategoryNameToAdd)) {
                let newCategories = [...Categories];
                newCategories.push(CategoryNameToAdd);
                SetCategories(newCategories);
                localStorage.setItem("categories", JSON.stringify(newCategories));
                NotifySuccess("Category added successfuly");
            }
            else
                NotifyError("A category with the name \"" + CategoryNameToAdd + "\" already exist");
        }
        else
            NotifyWarning("Please do not leave the input field empty");
    }

    const EditCategory = (e) => {
        e.preventDefault();
        let OldCategoryName = document.getElementById("SelectCategoryToEdit").value;
        let NewCategoryName = document.getElementById("EditInputNew").value.trim();
        if (OldCategoryName !== null && OldCategoryName !== "" && NewCategoryName !== null && NewCategoryName !== "") {
            if (Categories.includes(OldCategoryName)) {
                if (!Categories.includes(NewCategoryName)) {
                    let newCategories = [...Categories];
                    const indexToReplace = newCategories.findIndex(oldCategory => oldCategory === OldCategoryName);
                    newCategories[indexToReplace] = NewCategoryName
                    SetCategories(newCategories);
                    /*Transfer Products*/
                    let tansferProducts = Products.filter(product => product.category === OldCategoryName);
                    if (tansferProducts !== null) {
                        tansferProducts.forEach(product => {
                            product.category = NewCategoryName;
                        });
                        localStorage.setItem("products", JSON.stringify(Products));
                    }
                    localStorage.setItem("categories", JSON.stringify(newCategories));
                    NotifySuccess("Category edited")
                    document.getElementById("EditInputNew").value = "";
                    SeteditVal(null);
                }
                else
                    NotifyError("Could not edit the category, category with same name already exist.");
            }
            else
                NotifyError("Could not edit the category, category doesnt exist.");
        }
        else
            NotifyWarning("Please do not leave the input field empty.");
    }

    const RemoveCategory = (e) => {
        e.preventDefault();
        let CategoryNameToRemove = document.getElementById("SelectCategoryToRemove").value.trim();
        if (CategoryNameToRemove != null && CategoryNameToRemove !== "") {
            if (Categories.includes(CategoryNameToRemove)) {
                let newCategories = Categories.filter(function (category) {
                    return category !== CategoryNameToRemove;
                });
                SetCategories(newCategories);
                /*Remove Products*/
                let newProducts = Products.filter(product => product.category !== CategoryNameToRemove);
                if (newProducts !== null) {
                    localStorage.setItem("products", JSON.stringify(newProducts));
                }

                localStorage.setItem("categories", JSON.stringify(newCategories));
                NotifySuccess("Category removed")
                SetremoveVal(null);
            }
            else
                NotifyError("Could not remove the category");
        }
        else
            NotifyWarning("Please do not leave the input field empty");
    }

    return (

        <div className='CenteredForm'>
            <h1 className='PageHeader'><span>Manage Categories</span></h1>
            <form className="CenteredForm ManageForm">
                <label>Enter category name to add:</label>
                <input className='CustomInput' type="text" id="AddInput" placeholder="Category name to add" />
                <button className='CustomButton' onClick={AddCategory}>Add category</button>
                <hr />
                <label>Select a category to edit (to be replaced):</label>
                <Select onChange={handleCategoryToEditChanged} options={GetCategoryOptions()} id='SelectCategoryToEdit' value={editVal} />
                <label>Enter your new name:</label>
                <input className='CustomInput' type="text" id="EditInputNew" placeholder="Category name to replace" />
                <button className='CustomButton' onClick={EditCategory}>Edit category</button>
                <hr />
                <label>Select a category to remove:</label>
                <Select onChange={handleCategoryToRemoveChanged} options={GetCategoryOptions()} id='SelectCategoryToRemove' value={removeVal} />
                <button className='CustomButton' onClick={RemoveCategory}>Remove Category</button> <br />

            </form>

            <ToastContainer position='top-center' autoClose='2000' />

        </div >

    );

}