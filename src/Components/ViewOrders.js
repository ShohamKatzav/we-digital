import { useNavigate } from 'react-router-dom';
import { useEffect} from "react";

export default function ViewOrders() {

    const navigate = useNavigate();
    const Users = JSON.parse(localStorage.getItem("users"));
    const Orders = JSON.parse(localStorage.getItem("orders"));

    useEffect(() => 
    {
        const FillTheTable = () => {
            var table = document.getElementById("OrdersTable");
            let rows = document.querySelectorAll("tr");
            if (table && rows.length < 2) {
                for (let i = 0; i < Users.length; i++) {

                    let userHaveOrders = Orders.filter(order => order.userID === Users[i].id)

                    if (userHaveOrders.length > 0) {
                        var newRow = table.insertRow(-1);
                        var UserNameCell = newRow.insertCell(0);
                        UserNameCell.innerHTML = Users[i].name;
                        UserNameCell.classList.add("UserNameCell");


                        for (let j = 0; j < userHaveOrders.length; j++) {
                            var OrderIDCell = newRow.insertCell(-1);
                            OrderIDCell.classList.add("ClickableCell");
                            OrderIDCell.innerHTML = userHaveOrders[j].orderID;
                            OrderIDCell.addEventListener("click", (e) => {
                                navigate(e.target.innerHTML, { state: { user: Users[i], order: userHaveOrders[j] } })
                            });
                            if (j + 1 < userHaveOrders.length) {
                                newRow = table.insertRow(-1);
                                var emptyCell = newRow.insertCell(-1);
                                emptyCell.classList.add("empty");
                            }

                        }
                    }
                }
            }
        }
        FillTheTable();
    });

    return (
        <div>
            <table id='OrdersTable'>
                <tbody>
                    <tr>
                        <th>Customer</th>
                        <th>Order Number</th>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}