import React from "react";



 const Navbar = props => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
        Gestion du personnel !
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
              Agents
            </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Plannings</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Disponibiltés</a>
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
              <a href="#" className="btn btn-success">
                  Connexion !
             </a>
             </li>
             <li className="nav-item">
              <a href="#" className="btn btn-danger">
                  Déconnexion !
             </a>
             </li>
        </ul>
     </div>
   
  </nav> )
}

export default Navbar;

