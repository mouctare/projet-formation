import React, { useState, useContext } from "react";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";

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
           toast.success("Vous ete désormais connecté !");
           history.replace("/plannings");
          } catch(error) {
           setError(
               "Aucun compte n'est associé à cette adresse ou alors les informations ne correspondent pas !"
            );
            toast.error("Une erreur est survenue");
         }
      };
     
    return (

    <div className="d-flex justify-content-center login-area">
     <Card style={{ widht: "30rem" }}>
       <h3 className="text-center mt-2 mb-2 text-uppercase">Login</h3>
       <hr />

       <Card.Body>
          <Form  onSubmit={handleSubmit}>
          <Field  
         label="Adresse email"
         name="username" 
         value={credentials.username} 
         onChange={handleChange}
         placeholder="Adresse email de connexion" 
         error={error}
         />

        <Field 
          name="password" 
          label="Mot de passe" 
          value={credentials.password} 
          onChange={handleChange}
          type="password" 
          error="" 
          />
       <div className="text-center">
       <Button 
         variant="primary" type="submit" 
         className="btn btn-primary btn-block text-uppercase"
        >
         Login
       </Button>
       </div>
    </Form>
 </Card.Body>
 </Card>
</div>
);
}; 


export default LoginPage;
