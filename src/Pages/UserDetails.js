import { useLocation, useNavigate } from "react-router-dom";
import GetPicture from "../Import/ProfilePictures";

export default function UserDetails() {

  const data = useLocation().state;
  const navigate = useNavigate();
  var User;
  if (data)
    User = data.user;


  const navigateToOrders = () =>
  {
      navigate('/Orders', { state: { user: User } });
  }
  if (User)
    return (
      <div className="CenteredForm">
        <h1 className="PageHeader"><span>{User.name}</span></h1>
        <form className="UserDetails CenteredForm">
          <img className="Avatar" src={GetPicture(User.avatar)} alt="avatar"></img> <br />
          <div className="UserInfo">
            <label>First Name: {User.name}</label>
            <label>Last Name: {User.lastName}</label>
            <label>Email: {User.email}</label>
            <label>Customer number: {User.id}</label>
            <label>Account type: {User.authorize}</label>
          </div>
          <button className="CustomButton" type="button" onClick={navigateToOrders}>Orders</button>
        </form>
      </div>
    );
  else
    return (<div>Page Not Found</div>);
}