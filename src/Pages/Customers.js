
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../Components/Search';

export default function Customers() {

    const navigate = useNavigate();
    const [Users, SetUsers] = useState([]);

    async function getUsers() {
        let myObject = await fetch('users.json');
        let myText = await myObject.text()
        await SetUsers(JSON.parse(myText));
    }



    useEffect(() => {
        getUsers();
        const FillTheTable = () => {
            var table = document.getElementById("UsersTable");
            let rows = document.querySelectorAll("tr");
            if (rows.length < 1) {
                for (let i = 0; i < Users.length; i++) {
                    var newRow = table.insertRow(-1);
                    var cell = newRow.insertCell(0);
                    cell.classList.add("ClickableCell");
                    cell.innerHTML = Users[i].username;
                    cell.addEventListener("click", (e) => {
                        navigate(e.target.innerHTML, { state: { user: Users[i] } });
                    })
                }
            }
        }
        FillTheTable();
    }, [Users, navigate]);

    return (
        <div className='CenteredForm'>
            <h1 className='PageHeader'>Customers</h1>
            <table id='UsersTable'>
                <tbody>
                </tbody>
            </table>
            <h2 className="PageHeader">Users search:</h2>
            <div className="Search">
                <Search items={Users} type="customer" />
            </div>
        </div>
    );
}
