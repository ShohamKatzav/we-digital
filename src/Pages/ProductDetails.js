import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const Products = JSON.parse(localStorage.getItem("products"));
  const Data = useParams();
  const ProductUrl = Data.ProductName;
  const Product = Products.find(product => product.url === ProductUrl);

  let added = false;


  const waitFor = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), time);
    });
  };

  const ChangeButtonStyle = async () => {
    const done = document.querySelector(".done");
    if (added) {
      done.style.transform = "translate(-110%) skew(-40deg)";
      added = false;
    }
    else {
      done.style.transform = "translate(0px)";
      added = true;
    }
  }

  const AddToCart = async (e) => {
    e.preventDefault();
    var Order;
    var User = JSON.parse(sessionStorage.getItem("ConnectedUser"));
    if (sessionStorage.getItem("NewOrder") === null) {
      Order = {
        orderID: "NewOrder",
        userID: User.id,
        productsID: [Product.id],
        tottalPrice: Product.price
      }
    }
    else {
      Order = JSON.parse(sessionStorage.getItem("NewOrder"));
      Order.productsID.push(Product.id);
      Order.tottalPrice += Product.price;
    }
    sessionStorage.setItem("NewOrder", JSON.stringify(Order));
    await ChangeButtonStyle();    // Execute first
    await waitFor(1000); // wait 1000 milliseconds
    await ChangeButtonStyle()     // then run this
  }

  if (Product) {
    return (
      <div className="CenteredForm">
        <h1 className="PageHeader"><span>{Product.name}</span></h1>
        <form className="ProductDetails">
          <section>
            <img className="ProductImage Column" src={Product.img} alt="Product"></img>
            <p className="Info Column">
              <label>Type: {Product.category}</label>
              <label>Manufacturer: {Product.manufacturer}</label>
              <label>Price: {Product.price}</label>
            </p>
            <div className="clearShort"></div>
            <div className="CenteredForm"><button onClick={AddToCart} className="addtocart">
              <div className="pretext">
                <i className="fas fa-cart-plus"></i> ADD TO CART
              </div>

              <div className="pretext done">
                <div className="posttext"><i className="fas fa-check"></i> ADDED</div>
              </div>
            </button>
            </div>
          </section>
        </form>
      </div>)
  }
  else return null;
}