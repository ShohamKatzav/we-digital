import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';

export default function ChangeCustomerInOrder() {

    const data = useLocation();
    const navigate = useNavigate();
    var CurrentOrder = data.state.order;
    const Orders = JSON.parse(localStorage.getItem("orders"));
    const Users = JSON.parse(localStorage.getItem("users"));

    const NotifyCustomerChanged = () => {
        toast.success("Customer has successfully been changed", {
            onClose: () => {
                navigate("/Orders/" + CurrentOrder.orderID, { state: { user: Users.find(user => user.id === CurrentOrder.userID), order: CurrentOrder } },{ replace: true })
            }
        });
    }
    const NotifyCustomerChangedError = () => {
        toast.error(Users.find(user => user.id === CurrentOrder.userID).name + "is already the owner of this order");
    }

    const handleCustomerChanged = (selectedOption) =>
    {
        document.getElementById("SelectCustomer").value = selectedOption;
    }
    const GetCustomerOptions = () => {
        let options = [];
        options[0] = {
            label: 'Customers',
            options:
                Array.from(Users).map((user) =>
                    ({ value: user.id, label: user.name }))
        }
        return options;
    }

    const ChangeCustomer = () => {
        var newCustomerId = parseInt(document.getElementById("SelectCustomer").value);
        if (CurrentOrder.userID !== newCustomerId) {
            CurrentOrder.userID = parseInt(document.getElementById("SelectCustomer").value.value);
            let newOrderList = [...Orders];
            const indexToReplace = newOrderList.findIndex(oldOrder => oldOrder.orderID === CurrentOrder.orderID);
            newOrderList[indexToReplace] = CurrentOrder;
            localStorage.setItem("orders", JSON.stringify(newOrderList));
            NotifyCustomerChanged();
        }
        else {
            NotifyCustomerChangedError();
        }
    }


    return (
        <div>
            <h1 className="PageHeader">Change Customer for order number {CurrentOrder.orderID}</h1>
            <form className="CenteredForm ManageForm">
                Current customer: {Users[CurrentOrder.userID - 1].name}
                <div >
                    <Select onChange={handleCustomerChanged} options={GetCustomerOptions()} id='SelectCustomer' />
                    <button className='CustomButton' type="button" onClick={ChangeCustomer}>Change Customer</button>
                </div>
            </form>
            <ToastContainer position='top-center' autoClose='2000' />
        </div>
    );
}
