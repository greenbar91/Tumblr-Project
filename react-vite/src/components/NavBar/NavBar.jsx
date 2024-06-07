import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikesThunk } from "../../redux/session";

function NavBar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likes = useSelector((store) => store.session.likes);
  const user = useSelector((store) => store.session.user);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    handleDropdownToggle();
    navigate("/");
  };

  useEffect(() => {
    dispatch(getUserLikesThunk);
  }, [dispatch, user]);

  return (
    <nav className="nav-bar-container">
      <ul>
        <li className="logo-container">
          <NavLink to={"/"} className="logo">
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
          <li
            className="nav-bar-account-container"
            onClick={handleDropdownToggle}
          >
            <div className="person-sharp">
              <IoPersonSharp />
            </div>
            <div className="nav-bar-account">Account</div>
            {isDropdownVisible && (
              <ul className="dropdown-content">
                <NavLink to={"/likes"} className={"nav-link"}>
                  <li className="dropdown-options">
                    Likes
                    <div className="likes-count">{likes.length}</div>
                  </li>
                </NavLink>
                <NavLink to={"/following"} className={"nav-link"}>
                  <li className="dropdown-options">Following</li>
                </NavLink>
                <li className="dropdown-options" onClick={logout}>
                  Log Out
                </li>
                <NavLink to={"/blog"} className={"nav-link"}>
                  <li className="dropdown-options">Blog</li>
                </NavLink>
              </ul>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
