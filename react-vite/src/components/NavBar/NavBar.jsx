import CreateContentButton from '../CreateContentButton';
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikesThunk } from "../../redux/like";

function NavBar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likes = useSelector((store) => store.likes.likes);
  const user = useSelector((store) => store.session.user);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    handleDropdownToggle();
    navigate("/explore");
  };

  useEffect(() => {
    dispatch(getUserLikesThunk);
  }, [dispatch, user]);

  return (
    <nav className="nav-bar-container">
      <ul id="user-nav-ul">
        <li className="logo-container">
          <NavLink to={"/"} className="logo">
            <h3>Rumblr</h3>
          </NavLink>
        </li>
        <div className="nav-bar-options">
          {user && (
            <>
              <div className="nav-bar-sizing">
                <NavLink to={"/"} className={"nav-link"}>
                  <li className="nav-bar-home-container">
                    <div id="grouped">
                      <div className="fa-home">
                        <FaHome />
                      </div>
                      <div className="nav-bar-home">Home</div>
                    </div>
                  </li>
                </NavLink>
              </div>
              <div className="nav-bar-sizing">
                <NavLink to={"/explore"} className={"nav-link"}>
                  <li className="nav-bar-explore-container">
                    <div id="grouped">
                      <div className="md-explore">
                        <MdExplore />
                      </div>
                      <div className="nav-bar-explore">Explore</div>
                    </div>
                  </li>
                </NavLink>
              </div>
              <div className="nav-bar-sizing">
                <li
                  className="nav-bar-account-container"
                  onClick={handleDropdownToggle}
                >
                  <div id="grouped">
                    <div className="person-sharp">
                      <IoPersonSharp />
                    </div>
                    <div className="nav-bar-account">Account</div>
                  </div>
                </li>
              </div>
            </>
          )}
          {!user && (
            <div className="nav-bar-sizing">
              <NavLink to={"/explore"} className={"nav-link"}>
                <li className="nav-bar-explore-container">
                  <div id="grouped">
                    <div className="md-explore">
                      <MdExplore />
                    </div>
                    <div className="nav-bar-explore">Explore</div>
                  </div>
                </li>
              </NavLink>
            </div>
          )}
          {user && isDropdownVisible && (
            <ul className="dropdown-content" id="likes-border">
              <NavLink to={"/likes"} className={"nav-link"}>
                <div id="grouped">
                  <li className="dropdown-options" id="likes-sizing">
                    Likes
                  </li>
                  <div className="likes-count">{likes.length}</div>
                </div>
              </NavLink>

              <div className="nav-bar-sizing">
                <NavLink to={"/following"} className={"nav-link"}>
                  <li className="dropdown-options">Following</li>
                </NavLink>
              </div>
              <div className="nav-bar-sizing">
                <li className="dropdown-options" onClick={logout}>
                  Log Out
                </li>
              </div>
              <div className="nav-bar-sizing">
                <NavLink to={"/blog"} className={"nav-link"}>
                  <li className="dropdown-options">Posts</li>
                </NavLink>
              </div>
            </ul>
          )}
        </div>
      </ul>

      <div>
        {user && (<CreateContentButton />)}
      </div>

    </nav>
  );
}


export default NavBar;
