import EmptyCart from '../Images/EmptyCart.png'
import FullCart from '../Images/FullCart.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Cart() {

    var NewOrder = JSON.parse(sessionStorage.getItem("NewOrder"));
    const User = JSON.parse(sessionStorage.getItem("ConnectedUser"));
    const location = useLocation();

    if (location.pathname !=='/')
        return (
            <span>
                {NewOrder === null &&
                    <span>
                        <NavLink to={"/CreateOrder/NoProducts"} state={{ user: User, order: NewOrder }}>
                            { User.authorize === 'customer' &&
                                <img className='CartImageUser' src={EmptyCart} alt="Cart"></img>
                            }
                            { User.authorize === 'admin' &&
                                <img className='CartImage' src={EmptyCart} alt="Cart"></img>
                            }
                        </NavLink>
                    </span>
                }
                {NewOrder !== null &&
                    <span>
                        { User.authorize === 'customer' &&
                            <img className='CartImageUser' src={FullCart} alt="Cart"></img>
                        }
                        <NavLink to={"/CreateOrder/" + NewOrder.orderID} state={{ user: User, order: NewOrder }}>
                        { User.authorize === 'admin' &&
                            <img className='CartImage' src={FullCart} alt="Cart"></img>
                        }
                        </NavLink>
                    </span>
                }
            </span >
        );
}
