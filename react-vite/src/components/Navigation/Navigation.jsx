import "./Navigation.css";
import NavBar from "../NavBar";
import { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import AuthFormModal from '../AuthFormModal';
import { useSelector } from "react-redux";


function Navigation() {

  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
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
      <ul id="custom-ul">
        <div className="nav-bar">
          <NavBar />
        </div>
      </ul>
      {!user && (<div className="auth-form-modal-container">
        <p>Join over 100 million people using Rumblr to find their communities and make friends.</p>
        <div className="auth-form-button">
          <button className="sign-up-btn">
            <OpenModalMenuItem

              itemText="Sign me up"
              onItemClick={closeMenu}
              modalComponent={<AuthFormModal />}
            />
          </button>

          <button className="log-in-btn">
            <OpenModalMenuItem
              itemText="Log in"
              onItemClick={closeMenu}
              modalComponent={<AuthFormModal />}
            />
          </button>
        </div>



      </div>)}
    </div>
  );
}

export default Navigation;
