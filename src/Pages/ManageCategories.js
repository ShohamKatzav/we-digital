import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';


export default function ManageCategories() {

    const [Categories, SetCategories] = useState(JSON.parse(localStorage.getItem("categories")));
    var Products = JSON.parse(localStorage.getItem("products"));

    useEffect(() => {
        SetCategories(JSON.parse(localStorage.getItem("categories")));
    }, []);

    const notify = (message) => {
        toast.success(message);
    }

    const notify2 = (message) => {
        toast.error(message);
    }

    const notify3 = (message) => {
        toast.warning(message);
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
                notify("Category added successfuly");
            }
            else
                notify2("A category with the name \"" + CategoryNameToAdd + "\" already exist");
        }
        else
            notify3("Please do not leave the input field empty");
    }

    const EditCategory = (e) => {
        e.preventDefault();
        let OldCategoryName = document.getElementById("EditInputOld").value.trim();
        let NewCategoryName = document.getElementById("EditInputNew").value.trim();
        if (OldCategoryName !== null && OldCategoryName !== "" && NewCategoryName !== null && NewCategoryName !== "") {
            if (Categories.includes(OldCategoryName)) {
                if (!Categories.includes(NewCategoryName)) {
                    let newCategories = [...Categories];
                    const indexToReplace = newCategories.findIndex(oldCategory => oldCategory === OldCategoryName);
                    newCategories[indexToReplace] = NewCategoryName
                    SetCategories(newCategories);
                    /*Transfer Products*/
                    let tansferProducts = Products.filter(product => product.category === OldCategoryName );
                    if (tansferProducts !== null) {
                        tansferProducts.forEach(product => {
                            product.category = NewCategoryName;
                        });
                        localStorage.setItem("products", JSON.stringify(Products));
                    }

                    localStorage.setItem("categories", JSON.stringify(newCategories));
                    notify("Category edited")
                }
                else
                    notify2("Could not edit the category, category with same name already exist.");
            }
            else
                notify2("Could not edit the category, category doesnt exist.");
        }
        else
            notify3("Please do not leave the input field empty.");
    }

    const RemoveCategory = (e) => {
        e.preventDefault();
        let CategoryNameToRemove = document.getElementById("RemoveInput").value.trim();
        if (CategoryNameToRemove != null && CategoryNameToRemove !== "") {
            if (Categories.includes(CategoryNameToRemove)) {
                let newCategories = Categories.filter(function (category) {
                    return category !== CategoryNameToRemove;
                });
                SetCategories(newCategories);
                localStorage.removeItem(CategoryNameToRemove);
                localStorage.setItem("categories", JSON.stringify(newCategories));
                notify("Category removed")
            }
            else
                notify2("Could not remove the category");
        }
        else
            notify3("Please do not leave the input field empty");
    }

    return (

        <div>
            <h1 className='PageHeader'>Manage Categories</h1>
            <form className="CenteredForm ManageForm">
                <label>
                    {"\n"}
                    Enter category name to add: <br />
                    <input type="text" id="AddInput" placeholder="Category name to add" />
                    <button className='CustomButton' onClick={AddCategory}>Add category</button> 
                </label>
                <hr />
                <label>
                    Select a category to edit (to be replaced):
                    <select name="EditInputOld" id="EditInputOld">
                        {Categories !== null &&
                            Array.from(Categories).map((category, key) =>
                                <option value={category} key={key}>{category}</option>)
                        }
                    </select>
                    <input type="text" id="EditInputNew" placeholder="Category name to replace" />
                    <button className='CustomButton' onClick={EditCategory}>Edit category</button> 
                </label>
                <hr />
                <label>
                    Select a category to remove:
                    <select name="RemoveInput" id="RemoveInput">
                        {Categories !== null &&
                            Array.from(Categories).map((category, key) =>
                                <option value={category} key={key}>{category}</option>)
                        }
                    </select>
                    <button className='CustomButton' onClick={RemoveCategory}>Remove Category</button> <br />
                </label>

            </form>

            <ToastContainer position='top-center' autoClose='2000' />

        </div >

    );

}