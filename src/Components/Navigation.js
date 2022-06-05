import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Navigation() {

    let location = useLocation()
    const navigate = useNavigate();
    const [User, SetUser] = useState(null);


    const Logout = () => {
        navigate('/');
        localStorage.removeItem("ConnectedUser");
        sessionStorage.removeItem("ConnectedUser");
        sessionStorage.removeItem("NewOrder");

    }

    useEffect(() => {
        SetUser(JSON.parse(sessionStorage.getItem("ConnectedUser")));
    }, [location]);

    if (location.pathname === '/' || User === null)
    {
        return null;
    }

    else
        return (
            <nav className="Navigation">
                <NavLink className="nav-item" to="/Home">Home</NavLink>
                <NavLink className="nav-item" to="/Orders" state={{ user: User }}>My Orders</NavLink>
                <NavLink className="nav-item" to="/About">About</NavLink>
                <span className="nav-item custom-nav-item" onClick={Logout}>Logout</span>
                {User.authorize === 'admin' &&
                    <div>
                        <NavLink className="nav-item" to="/ManageCategories">Manage Categories</NavLink>
                        <NavLink className="nav-item" to="/ManageProducts">Manage Products</NavLink>
                        <NavLink className="nav-item" to="/ManageOrders">Manage Orders</NavLink>
                        <NavLink className="nav-item" to="/Customers">Customers</NavLink>
                    </div>
                }
            </nav>
        );

}