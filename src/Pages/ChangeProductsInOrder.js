import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function ChangeProductsInOrder() {

    const data = useLocation();
    const navigate = useNavigate();

    var CurrentOrder = data.state.order;
    const Products = JSON.parse(localStorage.getItem("products"));
    const [ProductsInTheCurrentOrder, SetProducts] = useState(Products.filter(product => CurrentOrder.productsID.includes(product.id)));
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const Users = JSON.parse(localStorage.getItem("users"));


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

    const SaveChanges = (e) =>
    {
        e.preventDefault();
        UpdateAndReplaceOrder(ProductsInTheCurrentOrder);
        NotifyProductChanged();
    }

    const RemoveProduct = (e) => {
        e.preventDefault();
        var SelectedProductId = parseInt(document.getElementById("SelectToRemove").value);
        if (ProductsInTheCurrentOrder.length < 1)
            NotifyNoProducts()

        else {
            if (SelectedProductId) {
                var SelectedProduct = ProductsInTheCurrentOrder.findIndex(product => product.id === SelectedProductId);
                var newProducts = ProductsInTheCurrentOrder.filter((value, arrIndex) => SelectedProduct !== arrIndex);
                console.log(SelectedProduct);
                SetProducts(newProducts);
            }
            else
                NotifyNoSelectedProduct("remove");
        }
    }

    const AddProduct = (e) => {
        e.preventDefault();
        var SelectedProductId = parseInt(document.getElementById("SelectToAdd").value);
        if (SelectedProductId) {
            var newProducts = [...ProductsInTheCurrentOrder, Products.find(product => product.id === SelectedProductId)];
            SetProducts(newProducts);
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
                    <label>Current items in your order:</label>
                    <select id="SelectToRemove" size="5">
                        {ProductsInTheCurrentOrder.length > 0 &&
                            Array.from(ProductsInTheCurrentOrder).map((product, key) =>
                                <option value={product.id} key={key}>{product.name}</option>)
                        }

                    </select> <br />
                    <button className='CustomButton' onClick={RemoveProduct}>Remove Product</button> <br />

                    <label>Choose an item to add:</label>
                    <select id="SelectToAdd" size='5'>
                        {Array.from(Products).map((product, key) =>
                            <option value={product.id} key={key}>{product.name}</option>)
                        }
                    </select> <br />
                    <button className='CustomButton' onClick={AddProduct}>Add Product</button>

                    <button className='CustomButton' onClick={SaveChanges}>Save Changes</button>
                </div>
            </form>
            <ToastContainer position='top-center' autoClose='2000' />
        </div>
    );
}
