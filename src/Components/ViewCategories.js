import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

export default function ViewCategories() {

    const [categories, Setcategories] = useState([]);
    if (localStorage.getItem("categories") === null) {
        localStorage.setItem("categories", JSON.stringify(["Laptops","Displays","Desktops", "Mice", "Keyboards"]));
    }

    useEffect(() => {
        Setcategories(JSON.parse(localStorage.getItem("categories")));
    }, []);

    return (
        <div>
            <div className="flex-container">
                {
                    Array.from(categories).map((category) =>

                        <NavLink className='flex-item' to={category}
                            state={{ category: category }}
                            key={category}>
                            <button className='flex-item'>{category}</button>
                        </NavLink>)
                }
            </div>

        </div>
    );
}