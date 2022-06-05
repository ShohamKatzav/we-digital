import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function MyOrders() {

    const [Orders] = useState(JSON.parse(localStorage.getItem("orders")));
    const navigate = useNavigate();
    const location = useLocation();
    const [User, SetUser] = useState(location.state.user);
    let UserHaveOrders = Orders.filter(order => order.userID === User.id);

    const InitTheTable = () => {
        var table = document.getElementById("OrdersTable");
        if (table) {
            table.innerHTML = "";
            var header = table.createTHead();
            var row = header.insertRow(0);
            var cell = row.insertCell(0);
            cell.innerHTML = "<b>Order Number</b>";
        }
    }

    useEffect(() => {
        SetUser(location.state.user);
        const FillTheTable = () => {
            var table = document.getElementById("OrdersTable");

            InitTheTable();

            if (table) {
                for (let j = 0; j < UserHaveOrders.length; j++) {
                    var newRow = table.insertRow(-1);
                    var OrderIDCell = newRow.insertCell(-1);
                    OrderIDCell.classList.add("ClickableCell");
                    OrderIDCell.innerHTML = UserHaveOrders[j].orderID;
                    OrderIDCell.addEventListener("click", (e) => {
                        navigate("/Orders/" + e.target.innerHTML, { state: { user: User, order: UserHaveOrders[j] } })
                    });
                }
            }

        }
        FillTheTable();
    }, [navigate, location, Orders, User, UserHaveOrders]);

    if (UserHaveOrders.length > 0) {
        return (
            <div>
                <h1 className='PageHeader'>Orders for {User.name}</h1>
                <table id='OrdersTable'>
                    <tbody id='tbody'>
                    </tbody>
                </table>
            </div>

        );
    }
    else
    return (
        <h1 className='PageHeader'>{User.name} has no orders</h1>
    );
}