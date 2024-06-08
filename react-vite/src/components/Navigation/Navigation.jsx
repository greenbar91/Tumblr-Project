import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import NavBar from "../NavBar";
import { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import AuthFormModal from '../AuthFormModal';


function Navigation() {

  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

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
      <div>
        <OpenModalMenuItem
          itemText="Sign me up"
          onItemClick={closeMenu}
          modalComponent={<AuthFormModal />}
        />

        <OpenModalMenuItem
          itemText="Log in"
          onItemClick={closeMenu}
          modalComponent={<AuthFormModal />}
        />
      </div>
    </div>
  );
}

export default Navigation;
