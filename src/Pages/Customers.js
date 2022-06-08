import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Components/Search';
import { DataGrid } from "@mui/x-data-grid";

export default function Customers() {

    const navigate = useNavigate();
    const Users = JSON.parse(localStorage.getItem('users'));
    const [pageSize, setPageSize] = useState(5);

    const rows = Array.from(Users).map(user => (
        {
            id: user.id,
            name: user.name,
            email: user.email
        }
    ));

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "E-mail", width: 270 }
    ];

    return (
        <div className='CenteredForm'>
            <h1 className='PageHeader'><span>Customers</span></h1>
            <div className='DataTable'>
                <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    onSelectionModelChange={(newSelectionModel) => {
                        var user = Users.find(user => user.id === parseInt(newSelectionModel))
                        navigate(user.name, { state: { user: user } });
                    }} />
            </div>
            <div className="CenteredForm">
                <h2 className="PageHeader"><span>Users search:</span></h2>
                <div className='Search'>
                    <Search items={Users} type="customer" />
                </div>
            </div>
        </div>
    );
}
