import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from "./OrderDetails";
import { useNavigate } from 'react-router-dom';
import { GetDate, GetLastDate } from "../GetDate/GetDate";

export default function CreateOrder() {

    var CurrentOrder = JSON.parse(sessionStorage.getItem("NewOrder"));
    const User = JSON.parse(sessionStorage.getItem("ConnectedUser"));
    const navigate = useNavigate();


    const RedirectAfterCreatingOrder = () => {
        toast.success("Order Created", {
            onClose: () => {
                navigate("/Orders/" + CurrentOrder.orderID, { state: { user: User, order: CurrentOrder } })
            }
        });
    }
    const RedirectAfterDiscardingOrder = () => {
        toast.success("Order Discarded", {
            onClose: () => {
                navigate("/Home")
            }
        });
    }

    const CreateOrder = () => {
        var newOrderList = JSON.parse(localStorage.getItem("orders"));
        var lastOrder = newOrderList.at(-1);
        CurrentOrder.orderID = lastOrder.orderID + 1;
        CurrentOrder.date = GetDate();
        CurrentOrder.lastDateToSupply = GetLastDate();
        newOrderList.push(CurrentOrder);
        localStorage.setItem("orders", JSON.stringify(newOrderList));
        sessionStorage.removeItem("NewOrder");
        RedirectAfterCreatingOrder();
    }
    const RemoveOrder = () => {
        sessionStorage.removeItem("NewOrder");
        RedirectAfterDiscardingOrder();
    }

    if (CurrentOrder) {
        return (
            <div className='CenteredForm'>  
                <OrderDetails user={User} order={CurrentOrder} />
                <button className='CustomButton' onClick={CreateOrder}>Create Order</button>
                <button className='CustomButton' onClick={RemoveOrder}>Discard Order</button>
                <ToastContainer position='top-center' autoClose='2000' />
            </div>

        );
    }
    else {
        return (
            <h1 className="PageHeader">There are no products in your shopping cart</h1>
        );
    }
}
