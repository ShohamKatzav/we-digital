import ViewCategories from "../Components/ViewCategories";
import PreviewProducts from "../Components/PreviewProducts";
import PRODUCTS from "../Import/ImportProducts"
import ORDERS from "../Import/ImportOrders";
import Search from "../Components/Search";
import Cart from "../Components/Cart";

export default function Home() {

    const User = JSON.parse(sessionStorage.getItem("ConnectedUser"));


    if (localStorage.getItem("ConnectedUser") !== null) {
        sessionStorage.setItem("ConnectedUser", localStorage.getItem("ConnectedUser"));
    }

    if (localStorage.getItem("products") === null) {
        localStorage.setItem("products", JSON.stringify(PRODUCTS));
    }

    if (localStorage.getItem("orders") === null) {
        localStorage.setItem("orders", JSON.stringify(ORDERS));
    }

    if (User) {
        return (
            <div>
                <Cart />
                <ViewCategories />
                <section className="Column SearchSection">
                    <h2 className="PageHeader"><span>Products search:</span></h2>
                    <div className="Search">
                        <Search items={JSON.parse(localStorage.getItem("products"))} type="product" />
                    </div>
                </section>
                <section className="Column PreviewProductsSection">
                    <h2 className="PageHeader"><span>Some of our products:</span></h2>
                    <PreviewProducts />
                </section>

            </div>);
    }
    else return null;


}

