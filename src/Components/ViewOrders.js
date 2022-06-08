import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function ViewOrders() {

    const navigate = useNavigate();
    const Users = JSON.parse(localStorage.getItem("users"));
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const [pageSize, setPageSize] = useState(5);

    const rows = Array.from(Orders).map(order => (
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

    useEffect(() => {
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
        
            <div className='DataTable'>
                <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    onSelectionModelChange={(newSelectionModel) => {
                         var order = Orders.find(order => order.orderID === parseInt(newSelectionModel));
                         navigate(String(order.orderID), { state: { user: Users.find(user => user.id === order.userID), order: order } });
                    }} />
            </div>
        

    );
}