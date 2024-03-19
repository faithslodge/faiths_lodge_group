import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <img src="/FaithsLodgeLogo_high_res.png" alt="Logo" height={80}/>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/map">
              Map View
            </Link>

            <Link className="navLink" to="/list">
              List View
            </Link>

            <Link className="navLink" to="/addorg">
              Add Org
            </Link>

            <Link className="navLink" to="/options">
              Options
            </Link>

            {user.is_admin && <Link className="navLink" to="/admin">
              Admin
            </Link>}

            <LogOutButton className="navLinkButton" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
