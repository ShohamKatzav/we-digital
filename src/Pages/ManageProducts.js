import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState} from 'react';
import Select from 'react-select';


export default function ManageProducts() {

    const Categories = JSON.parse(localStorage.getItem("categories"));
    const [Products, SetProducts] = useState(JSON.parse(localStorage.getItem("products")));
    const [AddImageMethod, SetAddImageMethod] = useState({ label: "With a default Image", options: "With a default Image" });
    const [ChangeImageMethod, SetChangeImageMethod] = useState({ label: "With a default Image", options: "With a default Image" });
    const [ManageMode, SetManageMode] = useState("Add");
    const [removeVal, SetremoveVal] = useState(null);
    const [categoryVal, SetcategoryVal] = useState(null);
    const [productEditVal, SetproductEditVal] = useState(null);
    const [newcategoryVal, SetnewcategoryVal] = useState(null);

    const [DisableCategory, SetDisableCategory] = useState(true);
    const [DisableImage, SetDisableImage] = useState(true);

    const NotifySuccess = (message) => {
        toast.success(message);
    }
    const NotifyError = (message) => {
        toast.error(message);
    }
    const NotifyWarning = (message) => {
        toast.warning(message);
    }

    const handleNewImagChanged = (selectedOption) => {
        SetChangeImageMethod(selectedOption);
    }
    const handleNewCategoryChanged = (selectedOption) => {
        SetnewcategoryVal(selectedOption);
    }
    const handleProductToEditChanged = (selectedOption) => {
        SetproductEditVal(selectedOption);
    }
    const handleImageImportMethodChanged = (selectedOption) => {
        document.getElementById("ImageImportMethod").value = selectedOption;
        SetAddImageMethod(selectedOption);
    }
    const handleCategoryForAddedProductChanged = (selectedOption) => {
        document.getElementById("AddCategory").value = selectedOption.value;
        SetcategoryVal(selectedOption);
    }
    const handleProductToRemoveChanged = (selectedOption) => {
        document.getElementById("SelectProductToRemove").value = selectedOption.value;
        SetremoveVal(selectedOption);
    }
    const handleManageModeChanged = (selectedOption) => {
        document.getElementById("ManageMode").value = selectedOption.value;
        var SelectedManageMode = document.getElementById("ManageMode").value;
        SetManageMode(SelectedManageMode);
        SetAddImageMethod({ label: "With a default Image", options: "With a default Image" });
        SetChangeImageMethod({ label: "With a default Image", options: "With a default Image" });
    }

    const GetOneCategoryOptions = (labelName) => {
        var optionsArray = [];
        if (labelName === 'Import Methods')
            optionsArray = ['With a default Image', 'By a url', 'By browsing a local file']
        if (labelName === 'Manage Modes')
            optionsArray = ['Add', 'Edit', 'Remove'];
        if(labelName === 'Categories')
            optionsArray = Categories;
        let options = [{
            label: labelName,
            options:
                Array.from(optionsArray).map((item) =>
                    ({ value: item, label: item }))
        }]
        return options;
    }

    const GetProductOptions = () => {
        let options = [];
        for (let i = 0; i < Categories.length; i++) {
            options[i] = {
                label: Categories[i],
                options:
                    Array.from(Products).filter(product => product.category === Categories[i]).map((product) =>
                        ({ value: product.name, label: product.name }))
            }
        }
        return options;
    }
    const AddProduct = async function (e) {
        e.preventDefault();

        if (!CheckAddFormValidate()) {
            NotifyWarning("Please do not leave any requied field empty");

        }
        else
            if (Products.find(product => product.name === document.getElementById("AddName").value.trim()))
                NotifyError("Product with this name already exist, Try another name");

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
                switch (AddImageMethod.value) {
                    case "By a url":
                        newProduct.img = document.getElementById("PreviewImage").value;
                        break;
                    case "By browsing a local file":
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
                NotifySuccess("Product Added");
                // Init the form
                InitForm();
            }
    }


    const InitForm = () => {
        var checkbox = document.querySelectorAll("input[type='checkbox']");
        var TextAndNumber = document.querySelectorAll(".CustomInput");
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }
        for (let i = 0; i < TextAndNumber.length; i++) {
            TextAndNumber[i].value = "";
        }
        SetcategoryVal(null);
        SetremoveVal(null);
        SetproductEditVal(null);
        SetnewcategoryVal(null);
        SetAddImageMethod({ label: "With a default Image", options: "With a default Image" });
        SetChangeImageMethod({ label: "With a default Image", options: "With a default Image" });
        SetDisableCategory(true);
        SetDisableImage(true);
    }
    const EditProduct = async function (e) {
        e.preventDefault();
        var NameCheckbox = document.getElementById("NameCheckbox");
        var CategoryCheckbox = document.getElementById("CategoryCheckbox");
        var ImageCheckbox = document.getElementById("ImageCheckbox");
        var ManufacturerCheckbox = document.getElementById("ManufacturerCheckbox");
        var PriceCheckbox = document.getElementById("PriceCheckbox");

        if (!NameCheckbox.checked && !CategoryCheckbox.checked && !ImageCheckbox.checked && !ManufacturerCheckbox.checked && !PriceCheckbox.checked)
            NotifyWarning("Please select a field to edit");
        else {
            var FormStatus = CheckEditFormValidate(NameCheckbox, CategoryCheckbox, ImageCheckbox, ManufacturerCheckbox, PriceCheckbox);
            if (FormStatus === 0)
                NotifyError("Select a products to edit");
            else if (FormStatus === 1)
                NotifyWarning("Please do not leave any requied field empty");
            else
                if (Products.find(product => product.name === document.getElementById("NewName").value.trim()))
                    NotifyError("Product with this name already exist, Try another name");

                else {
                    var ProductToEdit = GetProductByName(productEditVal.value);
                    var EditedProduct = ProductToEdit;
                    if (NameCheckbox.checked) {
                        EditedProduct.name = document.getElementById("NewName").value;
                    }
                    if (CategoryCheckbox.checked) {
                        EditedProduct.category = newcategoryVal.value;
                    }
                    if (ManufacturerCheckbox.checked) {
                        EditedProduct.manufacturer = document.getElementById("NewManufacturer").value;
                    }
                    if (PriceCheckbox.checked) {
                        EditedProduct.price = document.getElementById("NewPrice").value;
                    }
                    if (ImageCheckbox.checked) {
                        switch (ChangeImageMethod.value) {
                            case "By a url":
                                EditedProduct.img = document.getElementById("EditedPreviewImage").value;
                                break;
                            case "By browsing a local file":
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
                    NotifySuccess("Product Edited");
                    // Init the form
                    InitForm();
                }
        }
    }
    const RemoveProduct = (e) => {
        e.preventDefault();
        var ProductNameToRemove = document.getElementById("SelectProductToRemove").value;
        if (ProductNameToRemove != null && ProductNameToRemove !== "") {
            let newProducts = Products.filter(function (product) {
                return product.name !== ProductNameToRemove;
            });
            SetProducts(newProducts);
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify(newProducts));
            NotifySuccess("Product removed");
            InitForm();
        }
        else
            NotifyError("Could not remove the product");

    }
    const CheckAddFormValidate = () => {
        if ((document.getElementById("AddName").value.trim() === "") ||
            (document.getElementById("AddCategory").value === undefined) ||
            (document.getElementById("AddManufacturer").value.trim() === "") ||
            (document.getElementById("Price").value.trim() === "")) {
            return false;
        }
        else
            return true;
    }
    const CheckEditFormValidate = (NameCheckbox, CategoryCheckbox, ImageCheckbox, ManufacturerCheckbox, PriceCheckbox) => {
        // 0 == no product selected
        if (!productEditVal)
            return 0;
        // 1 == invalid form (fields)
        else if ((NameCheckbox.checked && (document.getElementById("NewName").value.trim() === "")) ||
            (CategoryCheckbox.checked && !newcategoryVal) ||
            (ImageCheckbox.checked && !ChangeImageMethod) ||
            (ManufacturerCheckbox.checked && (document.getElementById("NewManufacturer").value === "")) ||
            (PriceCheckbox.checked && (document.getElementById("NewPrice").value < 1))) {
            return 1;
        }
        // valid form
        else
            return 3;
    }
    const EditProductNameCheckbox = (e) => {
        var nameTextbox = document.getElementById("NewName");
        if (e.target.checked === true)
            nameTextbox.placeholder = "Enter a new name";
        else
            nameTextbox.placeholder = "Mark the checkbox to type";
        nameTextbox.disabled = !nameTextbox.disabled;
    }
    const EditProductCategoryCheckbox = (e) => {
        SetnewcategoryVal(null);
        SetDisableCategory(!DisableCategory)
    }
    const EditProductImageCheckbox = (e) => {

        
        SetChangeImageMethod({label: "With a default Image", options: "With a default Image"});
        SetDisableImage(!DisableImage);
    }
    const EditProductPriceCheckbox = (e) => {
        var priceInput = document.getElementById("NewPrice");
        if (e.target.checked === true)
            priceInput.placeholder = "Enter a new price";
        else
            priceInput.placeholder = "Mark the checkbox to type";
        priceInput.disabled = !priceInput.disabled;
    }
    const EditProductManufacturerCheckbox = (e) => {
        var manufacturerInput = document.getElementById("NewManufacturer");
        if (e.target.checked === true)
            manufacturerInput.placeholder = "Enter a manufacturer name";
        else
            manufacturerInput.placeholder = "Mark the checkbox to type";
        manufacturerInput.disabled = !manufacturerInput.disabled;
    }
    const GetProductByName = (name) => {
        var RequestProduct = Products.find(product => product.name === name);
        return RequestProduct;
    }

    return (
        <div className='CenteredForm'>
            <h1 className='PageHeader'><span>Manage Products</span></h1>
            <form className="CenteredForm ManageForm">
                <div>
                    <label>Choose manage mode:</label>
                    <Select onChange={handleManageModeChanged} options={GetOneCategoryOptions('Manage Modes')} defaultValue={{ label: 'Add', options: 'Add' }} id='ManageMode' />
                </div>

                {ManageMode === "Add" &&
                    <div>
                        <label>Enter product name to add:</label>
                        <input className='CustomInput' type="text" id="AddName" placeholder="Product name to add" />
                        <label>Select a category for the new product:</label>
                        <Select onChange={handleCategoryForAddedProductChanged} options={GetOneCategoryOptions('Categories')} id="AddCategory" value={categoryVal} />
                        <label>Select image import method:</label>
                        <Select onChange={handleImageImportMethodChanged} options={GetOneCategoryOptions('Import Methods')} value={AddImageMethod} id='ImageImportMethod' />
                        {AddImageMethod.label === "With a default Image" &&
                            <label>Adding with default image.</label>
                        }
                        {AddImageMethod.label === "By a url" &&
                            <input className='CustomInput' type="text" id="PreviewImage" placeholder="Enter image location" />
                        }
                        {AddImageMethod.label === "By browsing a local file" &&
                            <input className='CustomInput' type="file" id="MyFile" accept="image/*" />
                        }
                        <label>Enter manufacturers name:</label>
                        <input className='CustomInput' type="text" id="AddManufacturer"
                            placeholder="Manufacturers Name"
                        />
                        <label>Enter price:</label>
                        <input className='CustomInput' type="number" id="Price"
                            placeholder="Price - Numbers only"
                            min="1" />
                        <button className='CustomButton' onClick={AddProduct}>Add product</button>
                    </div>
                }
                {ManageMode === "Edit" &&
                    <div>
                        <label>Select a product to edit:</label>
                        <Select onChange={handleProductToEditChanged} options={GetProductOptions()} id="SelectProductToEdit" value={productEditVal} />
                        <label>Select the fields you'd like to edit:</label>
                        <input type="checkbox" id="NameCheckbox" onChange={(e) => EditProductNameCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Product name</label>
                        <input className='CustomInput' type="text" id="NewName" placeholder="Mark the checkbox to type" disabled />
                        <input type="checkbox" id="CategoryCheckbox" onChange={(e) => EditProductCategoryCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Category</label><br /> <br />
                        <Select onChange={handleNewCategoryChanged} options={GetOneCategoryOptions('Categories')} id="NewCategory" value={newcategoryVal} isDisabled={DisableCategory} /><br />
                        <input type="checkbox" id="ImageCheckbox" onChange={(e) => EditProductImageCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Image</label><br /><br />
                        <Select onChange={handleNewImagChanged} options={GetOneCategoryOptions('Import Methods')} id="NewImage" value={ChangeImageMethod} isDisabled={DisableImage} />
                        {ChangeImageMethod.label === "With a default Image" &&
                            <label >Changing to default image.</label>
                        }
                        {ChangeImageMethod.label === "By a url" &&
                            <input className='CustomInput' type="text" id="EditedPreviewImage" placeholder="Enter image location" />
                        }
                        {ChangeImageMethod.label === "By browsing a local file" &&
                            <input className='CustomInput' type="file" id="EditedMyFile" accept="image/*" />
                        }
                        <input type="checkbox" id="ManufacturerCheckbox" onChange={(e) => EditProductManufacturerCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Manufacturer</label>
                        <input className='CustomInput' type="text" id="NewManufacturer" placeholder="Mark the checkbox to type" disabled />
                        <input type="checkbox" id="PriceCheckbox" onChange={(e) => EditProductPriceCheckbox(e)}></input>
                        <label className="LabelForCheckbox">Price</label>
                        <input className='CustomInput' type="number" id="NewPrice" placeholder="Mark the checkbox to type" min="1" disabled />
                        <button className='CustomButton' onClick={EditProduct}>Edit product</button>
                    </div>
                }
                {ManageMode === "Remove" &&
                    <div>
                        <label>Select a product to remove:</label>
                        <Select onChange={handleProductToRemoveChanged} options={GetProductOptions()} id="SelectProductToRemove" value={removeVal} />
                        <button className='CustomButton' onClick={RemoveProduct}>Remove product</button>
                    </div>
                }
            </form>
            <ToastContainer position='top-center' autoClose='2000' />
        </div >
    );
}