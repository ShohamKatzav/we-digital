import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function OrdersForUser() {

    const [Orders] = useState(JSON.parse(localStorage.getItem("orders")));
    const navigate = useNavigate();
    const location = useLocation();
    const [User, SetUser] = useState(location.state.user);
    let UserHaveOrders = Orders.filter(order => order.userID === User.id);
    const [pageSize, setPageSize] = useState(5);

    const rows = Array.from(UserHaveOrders).map(order => (
        {
            id: order.orderID,
            date: order.date,
            lastDate: order.lastDateToSupply,
            price: order.tottalPrice
        }
    ));

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "date", headerName: "Created On", width: 200 },
        { field: "lastDate", headerName: "Last Date To Supply", width: 200 },
        { field: "price", headerName: "Price", width: 100 }
    ];


    useEffect(() => {
        SetUser(location.state.user);
    }, [location]);

    if (UserHaveOrders.length > 0) {
        return (
            <form className='CenteredForm'>
                <h1 className='PageHeader'><span>Orders for {User.name}</span></h1>
                <div className='DataTable'>
                    <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        onSelectionModelChange={(newSelectionModel) => {
                            var order = UserHaveOrders.find(order => order.orderID === parseInt(newSelectionModel));
                            navigate(String(order.orderID), { state: { user: User, order: order } });
                        }} />
                </div>
            </form>

        );
    }
    else
        return (
            <div className='CenteredForm'>
                <h1 className='PageHeader'><span>{User.name} has no orders</span></h1>
            </div>
        );
}