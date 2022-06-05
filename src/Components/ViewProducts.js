import { useState, useEffect, } from 'react';
import { NavLink } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";

export default function ViewProducts(props) {

    const [ProductsForChosenCategory, SetProductsForChosenCategory] = useState([]);
    const [Manufacturer, SetManufacturer] = useState("All Manufacturers");
    const [HighestPrice, SetHighestPrice] = useState(0);

    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(100);

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }



    const GetProductsForChosenCategory = () => {
        return JSON.parse(localStorage.getItem("products")).filter(product => product.category === props.category);
    }

    const handlePriceChange = (e) => {
        if (e.minValue < (HighestPrice / 100 * 97))
            set_minValue(e.minValue);
        if (e.maxValue > (HighestPrice / 100 * 3))
            set_maxValue(e.maxValue);
        var tempProductsForChosenCategory = GetProductsForChosenCategory();
        if (Manufacturer === "All Manufacturers") {
            SetProductsForChosenCategory(tempProductsForChosenCategory.filter(product => product.category === props.category).filter(product => product.price >= e.minValue && product.price <= e.maxValue))
        }
        else {
            var chosenManufacturer = document.getElementById("ChosenManufacturer").value;
            SetProductsForChosenCategory(tempProductsForChosenCategory.filter(product => product.manufacturer === chosenManufacturer).filter(product => product.price >= e.minValue && product.price <= e.maxValue));
        }
    };
    const handleManufacturerChanged = (e) => {
        var chosenManufacturer = e.target.value;
        SetManufacturer(e.target.value);
        var tempProductsForChosenCategory = GetProductsForChosenCategory();
        if (chosenManufacturer !== "All Manufacturers") {
            tempProductsForChosenCategory = [...tempProductsForChosenCategory].filter(product => product.manufacturer === chosenManufacturer);
        }
        SetProductsForChosenCategory(tempProductsForChosenCategory);
        SetHighestPrice(Math.max(...tempProductsForChosenCategory.map(product => product.price)));
        set_minValue(0);
        set_maxValue(Math.max(...tempProductsForChosenCategory.map(product => product.price)));
    }

    useEffect(() => {
        var tempProductsForChosenCategory = JSON.parse(localStorage.getItem("products")).filter(product => product.category === props.category);
        SetProductsForChosenCategory(tempProductsForChosenCategory);
        if (tempProductsForChosenCategory.length > 0) {
            SetHighestPrice(Math.max(...tempProductsForChosenCategory.map(product => product.price)));
            set_maxValue(Math.max(...tempProductsForChosenCategory.map(product => product.price)));
        }
    }, [props.category]);

    return (
        <div>
            <section className="FiltersSection">
                <section className="Column ManufacturerSection">
                    <h4>Filter by manufacturer</h4>
                    <select name="ChosenManufacturer" id="ChosenManufacturer" onChange={(e) => handleManufacturerChanged(e)}>
                        <option value="All Manufacturers" >All Manufacturers</option>
                        {
                            Array.from(JSON.parse(localStorage.getItem("products")).filter(product => product.category === props.category)).map(product => product.manufacturer).filter(onlyUnique).map((manufacturer, key) =>
                                <option value={manufacturer} key={key}>{manufacturer}</option>)
                        }

                    </select>
                </section>
                <section className="Column PriceSection">
                    <h4>Filter by price</h4>
                    <MultiRangeSlider
                        min={0}
                        max={HighestPrice}
                        step={5}
                        ruler={false}
                        label={true}
                        preventWheel={false}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                            handlePriceChange(e);
                        }}
                    />
                </section>
            </section>
            {(ProductsForChosenCategory.length > 0) &&
                <form className='products-table'>
                    {Array.from(ProductsForChosenCategory).map((product, key) =>
                        <NavLink className="label-for-product" to={product.url} key={key}>
                            <section className='product'>
                                <label>{product.name}</label>
                                <img className='product-image' src={product.img} alt={product.url}></img>
                                <label>{product.price}₪</label>
                            </section>
                        </NavLink>)
                    }
                </form>
            }
            {(ProductsForChosenCategory.length === 0) &&
                <form className='products-table'>
                    <h1>No products to show</h1>
                </form>
            }
        </div >
    );
}

