import React, {useContext} from "react";
import logo from '../logo.jpg';
import AuthAPI from "../services/AuthAPI";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";




 const Navbar = ({ history }) => {
   const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    // Quand je me deconnecte , je vais etre rédirigé vers le formulaire de connecxion.
    history.push("/login");

  }
    return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark
    navbar-dark px-sm-5">
      <img src={logo} alt="La sécurité est notre metier"  width="10%"
      
      />
      
     <NavLink className="navbar-brand" to="/">
        Gestion du personnel
      </NavLink>
    <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarColor03" 
        aria-controls="navbarColor03" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav mr-auto">
       <li className="nav-item">
          <NavLink className="nav-link" to="/Accueil">
             Accueil 
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/A propos"> 
           A propos
          </NavLink>
        </li>
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
            Indisponibiltés
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/services">
            Services
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rapports">
            Rapports
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="sites">
            Sites
            </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        {(!isAuthenticated && ( 
         <> 
               <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                    Inscription
            </NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/login" className="btn btn-success">
                Connexion !
              </NavLink>
             </li>
             </> 
        )) || (
       
         <li className="nav-item">
          <button onClick={handleLogout} className="btn btn-danger">
            Déconnexion !
          </button>
         </li>
        )}
           
        </ul>
     </div>
   
  </nav> )
}

export default Navbar;

