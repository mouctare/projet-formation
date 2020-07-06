import React, { useState } from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import "../css/app.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import AvailabilityPage from "./pages/AvailabilityPage";
import FooterPage from "./pages/FooterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanningsPage from "./pages/PlanningsPage";
import ReportsPage from "./pages/ReportsPage";
import ServicesPage from "./pages/ServicesPage";
import SitesPage from "./pages/SitesPage";
import UsersPage from "./pages/UsersPage";
import AuthAPI from "./services/AuthAPI";



// any CSS you import will output into a single css file (app.css in this case)


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log("Hello world !!!");

AuthAPI.setup();
 


 const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(
      AuthAPI.isAuthenticated()

      );

    const NavbarWithRouter = withRouter(Navbar);

   

 return ( 
   <AuthContext.Provider 
     value={{
    isAuthenticated,
    setIsAuthenticated
   }}
  >
   <HashRouter>
     <NavbarWithRouter  />

      <main className="container pt-5">
             <Switch>
                <Route  path="/login" component={LoginPage} />
                <PrivateRoute path="/services" component={ServicesPage}/>
                <PrivateRoute path="/rapports" component={ReportsPage} />
                <PrivateRoute  path="/disponibilites" component={AvailabilityPage}  /> 
                <PrivateRoute path="/sites" component={SitesPage} /> 
                <PrivateRoute path="/plannings" component={PlanningsPage} /> 
               <PrivateRoute path="/agents" component={UsersPage} />   
                <Route path="/" component={HomePage} />
             </Switch>
           </main>
         <FooterPage />
</HashRouter>
</AuthContext.Provider>

);

};


const rootElement = document.querySelector('#app');
ReactDom.render(<App/>,rootElement);