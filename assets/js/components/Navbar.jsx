import React from "react";
import logo from '../logo.jpg';



 const Navbar = props => {
    return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark
    navbar-dark px-sm-5">
      <img src={logo} alt="La sécurité est notre metier"  width="10%"
      
      />
      
     <a className="navbar-brand" href="#">
             Gestion du personnel 
        </a>
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
          <a className="nav-link" href="#">
          Accueil 
            </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">  A propos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Agents</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Plannings</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Idisponibiltés</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Services</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Rapports</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Sites</a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
             <li className="nav-item">
                 <a href="#" className="nav-link">
                     Inscription
                </a>

             </li>
          <li className="nav-item">
              <a href="#" className="btn btn-success">Connexion !
              </a>
             </li>
             <li className="nav-item">
              <a href="#" className="btn btn-danger">Déconnexion !
              </a>
             </li>
        </ul>
     </div>
   
  </nav> )
}

export default Navbar;

