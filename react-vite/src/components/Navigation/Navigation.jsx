import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import AuthFormModal from '../AuthFormModal';

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {/* <li>
        <ProfileButton />
      </li> */}

      <li><AuthFormModal /></li>
    </ul>
  );
}

export default Navigation;
