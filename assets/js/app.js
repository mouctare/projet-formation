import React from "react";
import ReactDom from "react-dom";
import "../css/app.css";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FooterPage from "./pages/FooterPage";
import UsersPage  from "./pages/UsersPage";
import UsersPageWithPagination from "./pages/UsersPageWithPagination";
import PlanningsPage from "./pages/PlanningsPage";
import SitesPage from "./pages/SitesPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import ReportsPage from "./pages/ReportsPage";
import ServicesPage from "./pages/ServicesPage";



// any CSS you import will output into a single css file (app.css in this case)


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log("Hello world !!!");


const App = () => {
   return ( 
<HashRouter>

       <Navbar/>

          <main className="container pt-5">
             <Switch>
                <Route path="/services" component={ServicesPage} />
                <Route path="/rapports" component={ReportsPage} />
                <Route path="/disponibilites" component={AvailabilityPage} /> 
                <Route path="/sites" component={SitesPage} /> 
                <Route path="/plannings" component={PlanningsPage} /> 
               <Route path="/agents" component={UsersPage} />   
                <Route path="/" component={HomePage} />
             </Switch>
           </main>
         <FooterPage />
</HashRouter>

);

};


const rootElement = document.querySelector('#app');
ReactDom.render(<App/>,rootElement);