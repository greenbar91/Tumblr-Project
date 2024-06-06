import { NavLink , useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useState } from "react";
import { thunkLogout } from "../../redux/session";
import { useDispatch} from "react-redux";


function NavBar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    handleDropdownToggle()
    navigate("/")
  };

  return (
    <nav className="nav-bar-container">
      <ul>
        <li className="logo">
          <NavLink to={"/"} className={"nav-link"}>
            Rumblr
          </NavLink>
        </li>
        <div className="nav-bar-options">
          <NavLink to={"/"} className={"nav-link"}>
            <li className="nav-bar-home-container">
              <div className="fa-home">
                <FaHome />
              </div>
              <div className="nav-bar-home">Home</div>
            </li>
          </NavLink>
          <NavLink to={"/"} className={"nav-link"}>
            <li className="nav-bar-explore-container">
              <div className="md-explore">
                <MdExplore />
              </div>
              <div className="nav-bar-explore">Explore</div>
            </li>
          </NavLink>
          <li className="nav-bar-account-container">
            <div className="person-sharp">
              <IoPersonSharp />
            </div>
            <div className="nav-bar-account" onClick={handleDropdownToggle}>
              Account
            </div>
            {isDropdownVisible && (
              <ul className="dropdown-content">
                <li>
                  <NavLink to={"/likes"} className={"nav-link"}>
                    Likes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/following"} className={"nav-link"}>
                    Following
                  </NavLink>
                </li>
                <li onClick={logout}>Log Out</li>
                <li>
                  <NavLink to={"/blog"} className={"nav-link"}>
                    Blog
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
