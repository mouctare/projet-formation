import React, { useContext } from 'react';
import AuthAPI from "../services/AuthAPI";
import { NavLink, Link } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";
import { toast } from 'react-toastify';







const Navbar = ({ history }) => {
  
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous ete désormais deconnecté ");
    history.push('/login');
  };
  


  return (
    
     
        <section id="nav-bar">
          <nav className="navbar navbar-expand-lg navbar-light">

            <a className="navbar-brand" href="#"><img src="images/logo.png" /></a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor03"
              aria-controls="navbarColor03"
              aria-expanded="false"
              aria-label="Toggle navigation" >
              <i className="fa fa-bars" />

              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav ml-auto">
                {(!isAuthenticated && (
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
                      <NavLink className="nav-link" to="/actions">
                        Actions
            </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact
            </NavLink>
                    </li>
                  </>))}



                {(isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/agents">
                        Agents
              </NavLink>
                    </li>
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
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/services">
                        Services
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
                  </>))}
              </ul>

              <ul className="navbar -nav ml -auto">
                {(!isAuthenticated && (
                  <>

                    <li className="nav-item">
                      <NavLink to="/login" className="btn btn-success">
                        Connexion !
           </NavLink>
                    </li>
                  </>
                )) || (
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-danger">
                        Déconnexion
             </button>
                    </li>
                  )}
              </ul>
            </div>
          </nav>
        </section>
    
        
    
  );
}


export default Navbar;