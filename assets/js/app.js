import React, { useState } from "react";
import ReactDom from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import "../css/app.css";
import Actions from "./components/Actions";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import AboutPage from "./pages/AboutPage";
import AvailabilitiePage from "./pages/AvailabilitiePage";
import AvailabilityPage from "./pages/AvailabilityPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import NoMatchPage from "./pages/NoMatch";
import PlanningPage from "./pages/PlanningPage";
import PlanningsPage from "./pages/PlanningsPage";
import ReportPage from "./pages/ReportPage";
import ReportsPage from "./pages/ReportsPage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import SitePage from "./pages/SitePage";
import SitesPage from "./pages/SitesPage";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";
import AuthAPI from "./services/AuthAPI";
import Header from "./components/Header";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




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
     <Header  />

    

      <main className="container pt-5">
             <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={LoginPage}/>
                <Route path="/about" component={AboutPage} />
                <Route path="/actions" component={Actions} />
                <Route path="/contact" component={ContactPage} />
                <PrivateRoute path="/services/:id" component={ServicePage}/>
                <PrivateRoute  path="/services" component={ServicesPage}/>
                <PrivateRoute  path="/rapports/:id" component={ReportPage} />
                <PrivateRoute  path="/rapports" component={ReportsPage} />
                <PrivateRoute  path="/disponibilites/:id" component={AvailabilitiePage}  /> 
                <PrivateRoute  path="/disponibilites" component={AvailabilityPage}  /> 
                <PrivateRoute  path="/sites/:id" component={SitePage} /> 
                <PrivateRoute  path="/sites" component={SitesPage} /> 
                <PrivateRoute  path="/plannings/:id" component={PlanningPage} /> 
                <PrivateRoute  path="/plannings" component={PlanningsPage} /> 
                <PrivateRoute  path="/agents/:id" component={UserPage} />
               <PrivateRoute   path="/agents" component={UsersPage} />   
               <Route  component={NoMatchPage} />
             </Switch>
           </main>
           < Footer/> 
         
</HashRouter>
<ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
</AuthContext.Provider>


);

};


const rootElement = document.querySelector('#app');
ReactDom.render(<App/>,rootElement);