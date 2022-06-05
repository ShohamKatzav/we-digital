import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDate, GetLastDate } from "../GetDate/GetDate";
import ViewOrders from "../Components/ViewOrders";
import Select from 'react-select'
import Search from "../Components/Search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageOrders() {

    const Users = JSON.parse(localStorage.getItem("users"));
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const Products = JSON.parse(localStorage.getItem("products"));
    const Categories = JSON.parse(localStorage.getItem("categories"));

    const [ManageMode, SetManageMode] = useState("Add");
    const [OrdersForView, SetOrders] = useState(Orders);
    const [ProductsInTheCurrentOrder, SetProducts] = useState([]);
    const navigate = useNavigate();

    var CurrentOrder = {
        orderID: 0,
        userID: 0,
        productsID: [],
        date: "",
        lastDateToSupply: "",
    }

    const NotifyEmptyField = (massage) => {
        toast.error(massage);
    }
    const NotifyOrderCreated = () => {
        toast.success("Order created successfully", {
            onClose: () => {
                navigate("/Orders/" + CurrentOrder.orderID, { state: { user: Users.find(user => user.id === CurrentOrder.userID), order: CurrentOrder } })
            }
        });
    }
    const NotifyNoProductSelected = () => {
        toast.warning("No Product Selected");
    }


    const NotifyOrderNotRemoved = () => {
        toast.error("No order selected");
    }

    const NotifyOrderRemoved = () => {
        toast.success("Order removed successfully");
    }


    const handleOptionChanged = (selectedOption) => {
        document.getElementById("SelectProductToAdd").value = selectedOption.value;
    }


    const GetOptions = () => {
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


    const CreateOrder = (e) => {
        e.preventDefault()
        if (CheckAddFormValidate()) {
            var lastOrder = Orders.at(-1);
            CurrentOrder.orderID = lastOrder.orderID + 1;
            CurrentOrder.userID = parseInt(document.getElementById("SelectUser").value);
            CurrentOrder.productsID = ProductsInTheCurrentOrder.map(product => product.id);
            CurrentOrder.date = GetDate();
            CurrentOrder.lastDateToSupply = GetLastDate();
            CurrentOrder.tottalPrice = CalcTottalPrices(CurrentOrder.productsID);
            SaveOrder();
            NotifyOrderCreated();
        }
    }

    const RemoveProduct = (e) => {
        e.preventDefault();
        var selectedProductName = document.getElementById("SelectProductToRemove").value;
        if (selectedProductName) {
            var selectedProduct = ProductsInTheCurrentOrder.findIndex(product => product.name === selectedProductName);
            var newProducts = ProductsInTheCurrentOrder.filter((value, arrIndex) => selectedProduct !== arrIndex);
            SetProducts(newProducts);
        }
        else
            NotifyNoProductSelected();
    }

    const AddProduct = (e) => {
        e.preventDefault();
        var selectedProductId = parseInt(document.getElementById("SelectProductToAdd").value);
        if (selectedProductId) {
            var newProducts = [...ProductsInTheCurrentOrder, Products.find(product => product.id === selectedProductId)];
            SetProducts(newProducts);
        }
        else
            NotifyNoProductSelected();
    }

    const CalcTottalPrices = (prodID) => {
        var TottalPrice = 0;
        for (let j = 0; j < prodID.length; j++)
            TottalPrice += Products.find(product => product.id === prodID[j]).price;
        return TottalPrice;
    }

    const SaveOrder = () => {
        var newOrderList = [...Orders];
        newOrderList[newOrderList.length] = CurrentOrder;
        localStorage.setItem("orders", JSON.stringify(newOrderList));
    }

    const ChangeManageMode = () => {
        var SelectedManageMode = document.getElementById("ManageMode").value;
        SetManageMode(SelectedManageMode);
    }

    const RemoveOrder = () => {
        var SelectedOrder = parseInt(document.getElementById("SelectOrderToRemove").value);
        if (SelectedOrder) {
            var newOrdersList = Orders.filter(order => order.orderID !== SelectedOrder);
            SetOrders(newOrdersList);
            localStorage.setItem("orders", JSON.stringify(newOrdersList));
            NotifyOrderRemoved();
        }
        else {
            NotifyOrderNotRemoved();
        }
    }

    const CheckAddFormValidate = () => {
        if (document.getElementById("SelectUser").value === "") {
            NotifyEmptyField("Please select a user");
            return false
        }
        var newProducts = document.getElementById("ProductsForNewOrder").options;
        if (newProducts.length < 1) {
            NotifyEmptyField("Please add product to your new order");
            return false
        }
        return true;
    }


    return (
        <div>
            <h1 className='PageHeader'>Manage Orders</h1>
            <form className="CenteredForm ManageForm">
                <label>Choose manage mode:</label>
                <select id="ManageMode" size="4" onChange={ChangeManageMode}>
                    <option value="Add">Add</option>
                    <option value="Edit">Edit</option>
                    <option value="Remove">Remove</option>
                    <option value="Search">Search</option>
                </select>
                {ManageMode === "Add" &&
                    <span>
                        <h2 className="PageHeader">Add an order</h2>
                        <div className="ChangeProducts">
                            <label>Choose a customer:</label>
                            <select id="SelectUser" size="5">
                                {Array.from(Users).map((user, key) =>
                                    <option value={user.id} key={key}>{user.name}</option>)
                                }
                            </select>

                            <label>Products in your new order:</label>
                            <select id="ProductsForNewOrder" size="5">
                                {Array.from(ProductsInTheCurrentOrder).map((product, key) =>
                                    <option key={key}>{product.name}</option>)
                                }
                            </select>
                            <button className='CustomButton' onClick={RemoveProduct}>Remove Product</button>

                            <Select onChange={handleOptionChanged} options={GetOptions()} id="SelectProductToAdd" />
                            <button className='CustomButton' onClick={AddProduct}>Add Product</button>
                            <button className='CustomButton' type="button" onClick={CreateOrder}>Create Order</button>

                        </div>
                    </span>
                }
                {ManageMode === "Edit" &&
                    <span>
                        <h2 className='PageHeader'>Choose an order to edit</h2>
                        <ViewOrders />
                    </span>
                }

                {ManageMode === "Remove" &&
                    <div>
                        <h2 className="PageHeader">Remove an order</h2>
                        <div className="CenteredForm">

                            <select id="SelectOrderToRemove" size={OrdersForView.length}>
                                {Array.from(OrdersForView).map((order, key) =>
                                    <option value={order.orderID} key={key}>Order number: {order.orderID} Customer Name: {Users[order.userID - 1].name}</option>)
                                }
                            </select>
                            <button className='CustomButton' type="button" onClick={RemoveOrder}>Remove the selected order</button>

                        </div>

                    </div>
                }
                {ManageMode === "Search" &&
                    <div>
                        <h2 className="PageHeader">Search an order</h2>
                        <div className="Search">
                            <Search items={JSON.parse(localStorage.getItem("orders"))} type="order" />
                        </div>
                    </div>
                }
            </form>
            <ToastContainer position='top-center' autoClose='2000' />
        </div>
    );
}
