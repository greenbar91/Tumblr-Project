import "./Navigation.css";
import NavBar from "../NavBar";
import { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import "./Navigation.css";
import OpenModalMenuItem from './OpenModalMenuItem';
import AuthFormModal from '../AuthFormModal';
import { useSelector, useDispatch } from "react-redux";
import { thunkLogin } from '../../redux/session';



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

  const dispatch = useDispatch();
  const handleDemoLogin = (e) => {
    e.preventDefault();

    return dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }));
  };

  return (

    <div className="site-container">
      <ul id="custom-ul">
        <div className="nav-bar">
          <NavBar />
        </div>
      </ul>

      {!user && (<div className="auth-form-modal-container">
        <p>Join over <strong>100 million</strong> people using <strong>Rumblr</strong> to find their <strong>communities</strong> and make <strong>friends.</strong></p>

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

        <a href="#" onClick={handleDemoLogin}>Demo User</a>

      </div>)}
    </div>
  );
}

export default Navigation;
