import React, { useContext, useState } from "react";
import AuthAPI from "../services/AuthAPI";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isRoleUser, setisRoleUser] = useState(false);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    const roles = JSON.parse(window.localStorage.getItem("UserRole"));
    setisRoleUser(roles?.user);
    toast.info("Vous ete désormais deconnecté ");
    history.push("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="#" className="logo">
            security Company
            <i className="fa fa-user-secret" />
          </a>
        </li>

        {!isAuthenticated && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/solutions">
                Solutions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/actions">
                Actions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </>
        )}
        <ul>
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-login">
                  login
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && (
          <>
            {!isRoleUser && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/agents">
                  Agents
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/plannings">
                Plannings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/disponibilites">
                Idisponibilités
              </NavLink>
            </li>
            {!isRoleUser && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/services">
                  Services
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/page">
                Gestion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sites">
                Sites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rapports">
                Rapports
              </NavLink>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-logout">
                Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
