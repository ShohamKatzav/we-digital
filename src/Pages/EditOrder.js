import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditOrder() {

    const [Orders, SetOrders] = useState(JSON.parse(localStorage.getItem("orders")));
    let { OrderID } = useParams();
    const [ProductsInThisOrder, SetProductsInThisOrder] = useState([]);
    const navigate = useNavigate();
    const data = useLocation().state;
    var CurrentOrder = data.order;
    var User = data.user;

    const CancelOrder = () => {
        const Orders = (JSON.parse(localStorage.getItem("orders")));
        var newOrdersList = Orders.filter(order => order.orderID !== CurrentOrder.orderID);
        SetOrders(newOrdersList);
        localStorage.setItem("orders", JSON.stringify(newOrdersList));
        navigate("/Orders", { state: { user: User } });
    }


    const ChangeCustomer = () => {
        navigate("/ChangeCustomer", { state: { order: CurrentOrder } });
    }

    const ChangeProducts = () => {
        navigate("/ChangeProducts", { state: { order: CurrentOrder } });
    }

    useEffect(() => {

        const GetProducts = () => {
            const products = JSON.parse(localStorage.getItem("products"));
            for (let i = 0; i < CurrentOrder.productsID.length; i++) {
                SetProductsInThisOrder(ProductsInThisOrder => [...ProductsInThisOrder, products.find(product => product.id === CurrentOrder.productsID[i])]);
            }
        }
        GetProducts();
    }, [data, CurrentOrder]);

    return (
        <div className="CenteredForm">
            {Orders.find(order => order.orderID === CurrentOrder.orderID) &&
                <h1 className="PageHeader"><span>Details for order number {OrderID}:</span></h1>
            }
            {OrderID === "NewOrder" &&
                <h1 className="PageHeader">Cart details</h1>
            }
            <form className="CenteredForm ManageForm">
                <p><label>Customer: {User.name} </label></p>
                <button className='CustomButton' type="button" onClick={ChangeCustomer}>Change Customer</button><br />
                <span>
                    <p>
                        <label>Products:</label> <br />
                        {
                            Array.from(ProductsInThisOrder).map((product, key) =>
                                <li key={key}>{product.name} - price: {product.price} ₪</li>)
                        }
                    </p>
                    <button className='CustomButton' type="button" onClick={ChangeProducts}>Change Products</button><br />
                    {Orders.find(order => order.orderID === CurrentOrder.orderID) &&
                        <span>
                            <p>Created on: <br />
                                {CurrentOrder.date} <br />
                            </p>
                            <p>
                                Last Date To Supply: <br />
                                {CurrentOrder.lastDateToSupply} <br />
                            </p>
                            <p>Total Price: {CurrentOrder.tottalPrice} ₪</p>
                            <button className='CustomButton' type="button" onClick={CancelOrder}>Cancel Order</button>
                        </span>
                    }
                </span>
            </form >
        </div >
    );
}