import { useState, useEffect, } from 'react';
import { NavLink } from "react-router-dom";

export default function PreviewProducts() {

    const [productsToView, SetproductsToView] = useState([]);



    useEffect(() => {
        const RandomProducts = () => {
            const Products = JSON.parse(localStorage.getItem("products"));
            var products = [];
            for (let i = 0; i < 4; i++) {
                var ProductIndex;
                do {
                    ProductIndex = Math.floor(Math.random() * Products.length);
                } while (products.includes(Products[ProductIndex]));
                products.push(Products[ProductIndex]);
            }
            return products;
        }
        SetproductsToView(RandomProducts);
    }, []);

    return (
        <section className='ManageForm preview-products-table'>
            {productsToView &&
                Array.from(productsToView).map((product, key) =>
                    <NavLink className="label-for-product" to={product.category + "/" + product.url} key={key}>
                        <section className='preview-product'>
                            <label>{product.name}</label>
                            <img className='preview-product-image' src={product.img} alt={product.url}></img>
                            <label>{product.price}₪</label>
                        </section>
                    </NavLink>)
            }

        </section>
    );
}

