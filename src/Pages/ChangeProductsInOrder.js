import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from 'react-select';
export default function ChangeProductsInOrder() {

    const data = useLocation();
    const navigate = useNavigate();
    var CurrentOrder = data.state.order;

    const Products = JSON.parse(localStorage.getItem("products"));
    const Categories = JSON.parse(localStorage.getItem("categories"));
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const Users = JSON.parse(localStorage.getItem("users"));
    const [ProductsInTheCurrentOrder, SetProducts] = useState(Products.filter(product => CurrentOrder.productsID.includes(product.id)));
    const [removeVal, SetremoveVal] = useState(null);
    const [addVal, SetaddVal] = useState(null);


    const NotifyProductChanged = () => {
        toast.success("Changes were successfully saved", {
            onClose: () => {
                navigate("/Orders/" + CurrentOrder.orderID, { state: { user: Users.find(user => user.id === CurrentOrder.userID), order: CurrentOrder } }, { replace: true })
            }
        });
    }
    const NotifyNoProducts = () => {
        toast.error("No products to remove");
    }

    const NotifyNoSelectedProduct = (value) => {
        toast.warning("Please select product to " + value);
    }

    const handleProductToAddChanged = (selectedOption) => {
        document.getElementById("SelectProductToAdd").value = selectedOption.value;
        SetaddVal(selectedOption);
    }
    const handleProductToRemoveChanged = (selectedOption) => {
        document.getElementById("SelectProductToRemove").value = selectedOption.value;
        SetremoveVal(selectedOption);
    }

    const GetProductOptions = () => {
        let options = [];
        for (let i = 0; i < Categories.length; i++) {
            options[i] = {
                label: Categories[i],
                options:
                    Array.from(Products).filter(product => product.category === Categories[i]).map((product) =>
                        ({ value: product.id, label: product.name }))
            }
        }
        return options;
    }
    const GetProductToRemoveOptions = () => {
        let options = [];
        for (let i = 0; i < Categories.length; i++) {
            var products = ProductsInTheCurrentOrder.filter(product => product.category === Categories[i]);
            if (products.length > 0) {
                options[i] = {
                    label: Categories[i],
                    options:
                        Array.from(products).map((product) =>
                            ({ value: product.id, label: product.name }))
                }
            }
        }
        return options;
    }

    const SaveChanges = (e) => {
        e.preventDefault();
        UpdateAndReplaceOrder(ProductsInTheCurrentOrder);
        NotifyProductChanged();
    }

    const RemoveProduct = (e) => {
        e.preventDefault();
        var SelectedProductId = parseInt(document.getElementById("SelectProductToRemove").value);
        if (ProductsInTheCurrentOrder.length < 1)
            NotifyNoProducts()

        else {
            if (removeVal !==null) {
                var SelectedProduct = ProductsInTheCurrentOrder.findIndex(product => product.id === SelectedProductId);
                var newProducts = ProductsInTheCurrentOrder.filter((value, arrIndex) => SelectedProduct !== arrIndex);
                SetProducts(newProducts);
                SetremoveVal(null);
            }
            else
                NotifyNoSelectedProduct("remove");
        }
    }

    const AddProduct = (e) => {
        e.preventDefault();
        var SelectedProductId = parseInt(document.getElementById("SelectProductToAdd").value);
        if (addVal!==null) {
            var newProducts = [...ProductsInTheCurrentOrder, Products.find(product => product.id === SelectedProductId)];
            SetProducts(newProducts);
            SetaddVal(null);
        }
        else
            NotifyNoSelectedProduct("add");
    }

    const UpdateAndReplaceOrder = (newProducts) => {
        var newProductsId = newProducts.map(product => product.id);
        CurrentOrder.productsID = newProductsId;
        CurrentOrder.tottalPrice = CalcTottalPrices(newProductsId);
        const indexToReplace = Orders.findIndex(order => order.orderID === CurrentOrder.orderID);
        var newOrderList = [...Orders];
        newOrderList[indexToReplace] = CurrentOrder;
        localStorage.setItem("orders", JSON.stringify(newOrderList));
    }

    const CalcTottalPrices = (prodID) => {
        var TottalPrice = 0;
        for (let j = 0; j < prodID.length; j++)
            TottalPrice += Products.find(product => product.id === prodID[j]).price;
        return TottalPrice;
    }

    return (
        <div>
            <h1 className="PageHeader">Change Products for order number {CurrentOrder.orderID}</h1>
            <form className="CenteredForm ManageForm">
                <div >
                    <label>Select a product to remove:</label>
                    <Select onChange={handleProductToRemoveChanged} options={GetProductToRemoveOptions()} id='SelectProductToRemove' value={removeVal} />
                    <button className='CustomButton' onClick={RemoveProduct}>Remove Product</button>
                    <label>Select a product to add:</label>
                    <Select onChange={handleProductToAddChanged} options={GetProductOptions()} id="SelectProductToAdd" value={addVal} />
                    <button className='CustomButton' onClick={AddProduct}>Add Product</button>

                    <button className='CustomButton' onClick={SaveChanges}>Save Changes</button>
                </div>
            </form>
            <ToastContainer position='top-center' autoClose='2000' />
        </div>
    );
}
