import axios from "axios";
import jwtDecode  from "jwt-decode";

/**
 * Déconnexion (suppression  du localStorage et sur axios )
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
 
}
 /**
  * Requete HTTP d'authentification et stockage du token le storage et sur Axios
  * @param {Object} credentials 
  */
function authenticate(credentials) {
  return axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token =>  {
      // Ici je stocke le token dans mon localStorage
        window.localStorage.setItem("authToken", token);
    // On prévient Axios  qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
        setAxiosToken(token);
       
    });
  }

  /**
   * Positionne le token JWT sur Axios
   * @param {string} token Le token JWT 
   */

  function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }

   /**
    * Mise en place du token  lors du chargement  de l'application
    */
    function setup() {
      // 1. Son but c'est de voir si on a un token?
      const token = window.localStorage.getItem("authToken");
      if(token ) {
        const {exp: expiration} =  jwtDecode(token);
        if(expiration * 1000  > new Date().getTime()) {
         setAxiosToken(token);
        }
      
        }
      }

      /**
       * Permet de savoir si on est authentifié ou pas 
       * @returns boolean
       */
      
      function isAuthenticated(){
        const token = window.localStorage.getItem("authToken");
        if (token) {
          const {exp: expiration} =  jwtDecode(token);
          if(expiration * 1000  > new Date().getTime()) {
             return true
          }
          return false;
        }
        return false;
      }
      
      // 2. Si le token est encore valide 
      // Alord on va donnée le token à axios
export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};

