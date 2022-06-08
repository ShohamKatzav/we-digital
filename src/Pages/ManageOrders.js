import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetDate, GetLastDate } from "../GetDate/GetDate";
import ViewOrders from "../Components/ViewOrders";
import Select from 'react-select';
import Search from "../Components/Search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";

export default function ManageOrders() {

    const navigate = useNavigate();
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const Categories = JSON.parse(localStorage.getItem("categories"));
    const Products = JSON.parse(localStorage.getItem("products"));
    const Users = JSON.parse(localStorage.getItem("users"));
    const [ManageMode, SetManageMode] = useState("Add");
    const [ProductsInTheCurrentOrder, SetProducts] = useState([]);
    const [removeVal, SetremoveVal] = useState(null);
    const [addVal, SetaddVal] = useState(null);
    const [pageSize, setPageSize] = useState(5);

    const [OrdersForView, SetOrders] = useState(Orders);
    const [OrderToRemove, SetOrderToRemove] = useState(null);

    const rows = Array.from(OrdersForView).map(order => (
        {
            id: order.orderID,
            customerName: (Users.find(user => user.id === order.userID)).name,
            date: order.date,
            lastDate: order.lastDateToSupply,
            price: order.tottalPrice
        }
    ));
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "customerName", headerName: "Customer Name", width: 150 },
        { field: "date", headerName: "Created On", width: 200 },
        { field: "lastDate", headerName: "Last Date To Supply", width: 200 },
        { field: "price", headerName: "Price", width: 100 }
    ];
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

    const handleProductToAddChanged = (selectedOption) => {
        document.getElementById("SelectProductToAdd").value = selectedOption.value;
        SetaddVal(selectedOption);
    }
    const handleProductToRemoveChanged = (selectedOption) => {
        document.getElementById("SelectProductToRemove").value = selectedOption.value;
        SetremoveVal(selectedOption);
    }
    const handleCustomerChanged = (selectedOption) => {
        document.getElementById("SelectUser").value = selectedOption.value;
    }
    const handleManageModeChanged = (selectedOption) => {
        document.getElementById("ManageMode").value = selectedOption.value;
        var SelectedManageMode = document.getElementById("ManageMode").value;
        SetManageMode(SelectedManageMode);
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


    const GetCustomerOptions = () => {
        let options = [];
        options[0] = {
            label: 'Customers',
            options:
                Array.from(Users).map((user) =>
                    ({ value: user.id, label: user.name }))
        }
        return options;
    }

    const GetManageOptions = () => {
        let ManageModes = ['Add', 'Edit', 'Remove', 'Search'];
        let options = [];
        options[0] = {
            label: 'Manage Modes',
            options:
                Array.from(ManageModes).map((manageMode) =>
                    ({ value: manageMode, label: manageMode }))
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
        if (removeVal) {
            var selectedProduct = ProductsInTheCurrentOrder.findIndex(product => product.id === removeVal.value);
            var newProducts = ProductsInTheCurrentOrder.filter((value, arrIndex) => selectedProduct !== arrIndex);
            SetProducts(newProducts);
            SetremoveVal(null);
        }
        else
            NotifyNoProductSelected();
    }

    const AddProduct = (e) => {
        e.preventDefault();
        if (addVal) {
            var newProducts = [...ProductsInTheCurrentOrder, Products.find(product => product.id === addVal.value)];
            SetProducts(newProducts);
            SetaddVal(null);
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

    const RemoveOrder = () => {
        var SelectedOrder = parseInt(OrderToRemove);
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
        if (!document.getElementById("SelectUser").value) {
            NotifyEmptyField("Please select a user");
            return false
        }
        if (ProductsInTheCurrentOrder.length < 1) {
            NotifyEmptyField("Please add a product to your new order");
            return false
        }
        return true;
    }


    return (
        <div className="CenteredForm">
            <h1 className='PageHeader'><span>Manage Orders</span></h1>
            <form className="CenteredForm ManageForm">
                <label>Choose manage mode:</label>
                <Select onChange={handleManageModeChanged} options={GetManageOptions()} defaultValue={{ label: 'Add', options: 'Add' }} id='ManageMode' />

                {ManageMode === "Add" &&
                    <span>
                        <h2 className="PageHeader">Add an order</h2>
                        <div className="ChangeProducts">
                            <label>Choose a customer:</label>
                            <Select onChange={handleCustomerChanged} options={GetCustomerOptions()} id='SelectUser' />
                            <label>Select a product to remove:</label>
                            <Select onChange={handleProductToRemoveChanged} options={GetProductToRemoveOptions()} id='SelectProductToRemove' value={removeVal} />
                            <button className='CustomButton' onClick={RemoveProduct}>Remove Product</button>
                            <label>Select a product to add:</label>
                            <Select onChange={handleProductToAddChanged} options={GetProductOptions()} id="SelectProductToAdd" value={addVal} />
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
                            <div className='DataTable'>
                                <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    onSelectionModelChange={(newSelectionModel) => {
                                        SetOrderToRemove(newSelectionModel);
                                    }} />
                            </div>
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
