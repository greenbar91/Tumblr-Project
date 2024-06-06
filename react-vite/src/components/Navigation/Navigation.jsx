// import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import NavBar from "../NavBar";

function Navigation() {
  return (
    <div className="site-container">
      <ul>
        <div className="nav-bar">
          <NavBar />
        </div>

        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
