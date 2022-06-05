import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';


export default function ManageProducts() {

    const [Products, SetProducts] = useState([]);
    const [Categories, SetCategories] = useState([]);
    const [AddImageMethod, SetAddImageMethod] = useState("With a default Image");
    const [ChangeImageMethod, SetChangeImageMethod] = useState("None");
    const [ManageMode, SetManageMode] = useState("Add");

    useEffect(() => {
        SetProducts(JSON.parse(localStorage.getItem("products")));
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

    const AddProduct = async function (e) {
        e.preventDefault();

        if (!CheckAddFormValidate()) {
            notify3("Please do not leave any requied field empty");

        }
        else
            if (Products.find(product => product.name === document.getElementById("AddName").value.trim()))
                notify2("Product with this name already exist, Try another name");

            else {
                var lastProduct = Products.at(-1);
                var newProducts = [...Products];
                var newProduct =
                {
                    id: lastProduct.id + 1,
                    url: document.getElementById("AddName").value.replace(' ', '-'),
                    name: document.getElementById("AddName").value,
                    category: document.getElementById("AddCategory").value,
                    manufacturer: document.getElementById("AddManufacturer").value,
                    price: parseInt(document.getElementById("Price").value)
                };
                switch (AddImageMethod) {
                    case "By a url":
                        newProduct.img = document.getElementById("PreviewImage").value;
                        break;
                    case "By Browsing a local file":
                        var file = document.getElementById("MyFile").files[0];
                        const processFile = (file) => {
                            const reader = new FileReader()
                            return new Promise((resolve, reject) => {
                                reader.onload = (fileEvent) => {
                                    const fileContents = fileEvent.target.result
                                    resolve(fileContents)
                                }
                                reader.onerror = () => {
                                    reject('oops, something went wrong with the file reader.')
                                }
                                reader.readAsDataURL(file)
                            })
                        }
                        newProduct.img = await processFile(file);
                        break;
                    default:
                        newProduct.img = require('../Images/NewProduct.png');
                        break;
                }
                newProducts[newProducts.length] = newProduct;

                SetProducts(newProducts);
                localStorage.removeItem("products");
                localStorage.setItem("products", JSON.stringify(newProducts));
                notify("Product Added");
            }
    }


    const EditProduct = async function (e) {
        e.preventDefault();
        var NameCheckbox = document.getElementById("NameCheckbox");
        var CategoryCheckbox = document.getElementById("CategoryCheckbox");
        var ImageCheckbox = document.getElementById("ImageCheckbox");
        var ManufacturerCheckbox = document.getElementById("ManufacturerCheckbox");
        var PriceCheckbox = document.getElementById("PriceCheckbox");
        if (!NameCheckbox.checked && !CategoryCheckbox.checked && !ImageCheckbox.checked && !ManufacturerCheckbox.checked && !PriceCheckbox.checked)
            notify3("Please select a field to edit");
        else {
            if (!CheckEditFormValidate(NameCheckbox, CategoryCheckbox, ImageCheckbox, ManufacturerCheckbox , PriceCheckbox))
                notify3("Please do not leave any requied field empty");
            else
                if (Products.find(product => product.name === document.getElementById("NewName").value.trim()))
                    notify2("Product with this name already exist, Try another name");

                else {
                    var ProductToEdit = GetProductByName(document.getElementById("EditProduct").value);
                    var EditedProduct = ProductToEdit;
                    if (NameCheckbox.checked) {
                        EditedProduct.name = document.getElementById("NewName").value;
                    }
                    if (CategoryCheckbox.checked) {
                        EditedProduct.category = document.getElementById("NewCategory").value;
                    }
                    if (ManufacturerCheckbox.checked) {
                        EditedProduct.manufacturer = document.getElementById("NewManufacturer").value;
                    }
                    if (PriceCheckbox.checked) {
                        EditedProduct.price = document.getElementById("NewPrice").value;
                    }
                    if (ImageCheckbox.checked) {
                        switch (ChangeImageMethod) {
                            case "By a url":
                                EditedProduct.img = document.getElementById("EditedPreviewImage").value;
                                break;
                            case "By Browsing a local file":
                                var file = document.getElementById("EditedMyFile").files[0];
                                const processFile = (file) => {
                                    const reader = new FileReader()
                                    return new Promise((resolve, reject) => {
                                        reader.onload = (fileEvent) => {
                                            const fileContents = fileEvent.target.result
                                            resolve(fileContents)
                                        }
                                        reader.onerror = () => {
                                            reject('oops, something went wrong with the file reader.')
                                        }
                                        reader.readAsDataURL(file)
                                    })
                                }
                                EditedProduct.img = await processFile(file);
                                break;
                            default:
                                EditedProduct.img = require('../Images/NewProduct.png');
                                break;
                        }
                    }
                    var newProducts = [...Products];
                    const indexToReplace = newProducts.findIndex(oldProduct => {
                        return oldProduct.name === ProductToEdit;
                    });
                    newProducts[indexToReplace] = EditedProduct;
                    SetProducts(newProducts);
                    localStorage.setItem("products", JSON.stringify(newProducts));
                    notify("Product Edited");
                }
        }
    }


    const CheckAddFormValidate = () => {
        if ((document.getElementById("AddName").value.trim() === "") ||
            (document.getElementById("AddCategory").value.trim() === "") ||
            (document.getElementById("AddManufacturer").value.trim() === "") ||
            (document.getElementById("Price").value.trim() === "")) {
            return false;
        }
        else
            return true;
    }
    const CheckEditFormValidate = (NameCheckbox, CategoryCheckbox, ImageCheckbox, ManufacturerCheckbox ,PriceCheckbox) => {
        if ((document.getElementById("EditProduct").value.trim() === "") ||
            (NameCheckbox.checked && (document.getElementById("NewName").value.trim() === "")) ||
            (CategoryCheckbox.checked && (document.getElementById("NewCategory").value === "")) ||
            (ImageCheckbox.checked && (document.getElementById("NewImage").value === "")) ||
            (ManufacturerCheckbox.checked && (document.getElementById("NewManufacturer").value === "")) ||
            (PriceCheckbox.checked && (document.getElementById("NewPrice").value < 1))) {
            return false;
        }
        else
            return true;
    }

    const RemoveProduct = (e) => {
        e.preventDefault();
        var ProductNameToRemove = document.getElementById("RemoveProduct").value;

        if (ProductNameToRemove != null && ProductNameToRemove !== "") {
            let newProducts = Products.filter(function (product) {
                return product.name !== ProductNameToRemove;
            });
            SetProducts(newProducts);
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify(newProducts));

            notify("Product removed");
        }
        else
            notify2("Could not remove the product");

    }

    const ChangeImageImportMethod = (e) => {
        var method = e.target.value;
        if (e.target.id === "ImageImportMethod")
            SetAddImageMethod(method);
        else
            if (e.target.id === "NewImage")
                SetChangeImageMethod(method);

    }
    const ChangeManageMode = () => {
        var mode = document.getElementById("ManageMode").value;
        SetManageMode(mode);
        SetAddImageMethod("With a default Image");
        SetChangeImageMethod("None");
    }

    const EditProductNameCheckbox = (e) => {
        var nameTextbox = document.getElementById("NewName");
        if (e.target.checked === true) {
            nameTextbox.placeholder = "Enter a new name";
            nameTextbox.disabled = false;
        }
        else {
            nameTextbox.placeholder = "Mark the checkbox to type";
            nameTextbox.disabled = true;
        }
    }
    const EditProductCategoryCheckbox = (e) => {
        var categorySelect = document.getElementById("NewCategory");
        if (e.target.checked === true) {
            categorySelect.value = " ";
            categorySelect.disabled = false;
        }
        else {
            categorySelect.value = "";
            categorySelect.disabled = true;
        }
    }
    const EditProductImageCheckbox = (e) => {

        var imageSelect = document.getElementById("NewImage");
        if (e.target.checked === true) {
            imageSelect.value = " ";
            imageSelect.disabled = false;
        }
        else {
            SetChangeImageMethod("None");
            imageSelect.value = "";
            imageSelect.disabled = true;
        }
    }

    const EditProductPriceCheckbox = (e) => {

        var priceInput = document.getElementById("NewPrice");
        if (e.target.checked === true) {
            priceInput.disabled = false;
        }
        else {
            priceInput.disabled = true;
        }
    }

    const EditProductManufacturerCheckbox = (e) =>{
        var manufacturerInput = document.getElementById("NewManufacturer");
        if (e.target.checked === true) {
            manufacturerInput.disabled = false;
        }
        else {
            manufacturerInput.disabled = true;
        }
    }

    const GetProductByName = (name) => {
        var RequestProduct = Products.find(product => product.name === name);
        return RequestProduct;
    }

    return (

        <div>
            <h1 className='PageHeader'>Manage Products</h1>
            <form className="CenteredForm ManageForm">
                <div>
                    <label>Choose manage mode:</label>
                    <select name="ManageMode" id="ManageMode" onChange={ChangeManageMode}>
                        <option value={"Add"}>Add</option>)
                        <option value={"Edit"}>Edit</option>)
                        <option value={"Remove"}>Remove</option>)
                    </select>
                </div>

                {ManageMode === "Add" &&
                    <div>
                        <label>Enter product name to add:</label>
                        <input type="text" id="AddName" placeholder="Product name to add" />
                        <label>Select a category for the new product:</label>
                        <select name="AddCategory" id="AddCategory" defaultValue="">
                            <option hidden></option>
                            {Categories !== null &&
                                Array.from(Categories).map((category, key) =>
                                    <option value={category} key={key}>{category}</option>)
                            }
                        </select>
                        <label>Select image import method:</label>
                        <select name="ImageImportMethod" id="ImageImportMethod" onChange={(e) => ChangeImageImportMethod(e)} defaultValue="With a default Image">
                            <option value={"With a default Image"}>With a default Image</option>)
                            <option value={"By a url"}>By a url</option>)
                            <option value={"By Browsing a local file"}>By Browsing a local file</option>)
                        </select>
                        {AddImageMethod === "With a default Image" &&
                            <label>Adding with a default image.</label>
                        }
                        {AddImageMethod === "By a url" &&
                            <input type="text" id="PreviewImage" placeholder="Enter image location" />
                        }
                        {AddImageMethod === "By Browsing a local file" &&
                            <input type="file" id="MyFile" accept="image/*" />
                        }
                        <label>Enter manufacturers name:</label>
                        <input type="text" id="AddManufacturer"
                            placeholder="Manufacturers Name"
                        />
                        <label>Enter price:</label>
                        <input type="number" id="Price"
                            placeholder="Price - Numbers only"
                            min="1" />
                        <button className='CustomButton' onClick={AddProduct}>Add product</button>
                    </div>
                }
                {ManageMode === "Edit" &&
                    <div>
                        <label>Select a product to edit:</label>
                        <select name="EditProduct" id="EditProduct">
                            <option value="" hidden>Select a product</option>
                            {Products !== null &&
                                Array.from(Products).map((product, key) =>
                                    <option value={product.name} key={key}>{product.name}</option>)
                            }
                        </select>
                        <label>Select the fields you'd like to edit:</label>
                        <input type="checkbox" id="NameCheckbox" onChange={(e) => EditProductNameCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Product name</label>
                        <input type="text" id="NewName" placeholder="Mark the checkbox to type" disabled />

                        <input type="checkbox" id="CategoryCheckbox" onChange={(e) => EditProductCategoryCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Category</label>
                        <select name="NewCategory" id="NewCategory" disabled defaultValue={""}>
                            <option value="" hidden>Mark the checkbox to select</option>
                            {Categories !== null &&
                                Array.from(Categories).map((category, key) =>
                                    <option value={category} key={key}>{category}</option>)
                            }
                        </select>

                        <input type="checkbox" id="ImageCheckbox" onChange={(e) => EditProductImageCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Image</label>
                        <select name="NewImage" id="NewImage" onChange={(e) => ChangeImageImportMethod(e)} disabled defaultValue={""}>
                            <option value="" hidden>Mark the checkbox to select</option>
                            <option value={"With a default Image"}>With a default Image</option>)
                            <option value={"By a url"}>By a url</option>)
                            <option value={"By Browsing a local file"}>By Browsing a local file</option>)
                        </select>
                        {ChangeImageMethod === "With a default Image" &&
                            <label >Changing to a default image.</label>
                        }
                        {ChangeImageMethod === "By a url" &&
                            <input type="text" id="EditedPreviewImage" placeholder="Enter image location" />
                        }
                        {ChangeImageMethod === "By Browsing a local file" &&
                            <input type="file" id="EditedMyFile" accept="image/*" />
                        }

                        <input type="checkbox" id="ManufacturerCheckbox" onChange={(e) => EditProductManufacturerCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Manufacturer</label>
                        <input type="text" id="NewManufacturer" placeholder="Mark the checkbox to type" disabled />

                        <input type="checkbox" id="PriceCheckbox" onChange={(e) => EditProductPriceCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Price</label>
                        <input type="number" id="NewPrice" placeholder="Mark the checkbox to type" min="1" disabled />
                        <button className='CustomButton' onClick={EditProduct}>Edit product</button>


                    </div>
                }
                {ManageMode === "Remove" &&
                    <div>
                        <label>Select a product to remove:</label>
                        <select name="RemoveProduct" id="RemoveProduct">
                            {Products !== null &&
                                Array.from(Products).map((product, key) =>
                                    <option value={product.name} key={key}>{product.name}</option>)
                            }
                        </select>
                        <button className='CustomButton' onClick={RemoveProduct}>Remove product</button>
                    </div>
                }

            </form>

            <ToastContainer position='top-center' autoClose='2000' />

        </div >
    );
}