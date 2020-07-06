import React, { useState, useContext } from "react";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";

 const LoginPage = ({  history  }) => {

      const { setIsAuthenticated } = useContext(AuthContext)

     const [credentials, setCredentials] = useState({
         username: "",
         password: ""
     });
     const [error, setError] = useState("");


      // Gestion des champs
     const handleChange =({ currentTarget}) => {
         const {value, name} = currentTarget;
         setCredentials({...credentials, [name]: value});
         // Je veux prendre c'est qu'il ya dans mes credentials et je vais l'ecrasé 
         //[name] dans les croché pour qui'l soit interpréter comme etant un variable
     };

     // Gestion de la soummission
     const handleSubmit = async event => {
         event.preventDefault();

         try {
           await AuthAPI.authenticate(credentials);
           setError("");
           setIsAuthenticated(true);
           history.replace("/plannings");
          } catch(error) {
           setError(
               "Aucun compte n'est associé à cette adresse ou alors les informations ne correspondent pas !"
            );
         }

         console.log(credentials);
     };
     
    return (

    <>

     <h1>Connexion à l'application  </h1>

     <form onSubmit={handleSubmit}>
      
          <div className="form-group">
              <label htmlFor="username">Adresse email</label>
             <input 
                value={credentials.username}
                onChange={handleChange}
                type="email" 
                placeholder="Adresse email de connexion" 
                name="username" 
                id="username"
                className={"form-control" + (error && " is-invalid")}
                />
                 {error && <p className="invalid-feedback">{error}</p>}
             </div>
           <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input 
              value={credentials.password}
                type="password" 
                onChange={handleChange}
                placeholder="Mot de passe" name="password" 
                id="password"
                className="form-control" />
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-success">Je me connecte
              </button>
        </div>
      </form>
   </>
    );
};


export default LoginPage;
