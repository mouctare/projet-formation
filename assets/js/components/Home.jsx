import React from 'react';
import {Link } from 'react-router-dom';
import { Jumbotron,  Row, Col, Image, Button} from 'react-bootstrap';


 const Home = () => {
  return (
  
       
    <div>
       <section id="banner">
         
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="promo-title">VOTRE PARTENAIRE DE CONFIANCE</p>
                <p>N'attendez plus pour nous Contacter, Vous satisfaire est notre raison d'etre</p>
                <a href="#"><img src="images/camera.png" /></a>
              </div>
              <div className="col-md-6 text-center">
                <img src="images/home1.png" className="img-fluid" />
              </div>
            </div>
          </div>
          <img src="images/wave1.jpg" className="bottom-img" />
        </section>

        <section id="services">
          <div className="container text-center">
            <h1 className="title"> Nos Services ?</h1>
            <div className="row text-center">
              <div className="col-md-4 services">
                <img src="images/service1.jpg" className="service-img" />
                <h4>Surveillance et Gardeniage</h4>
                <p>N'attendez plus pour nous Contacter, Vous satisfaire est notre raison d'etre</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
      Consulter les postes à pouvoir</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
          Consulter les postes à pouvoir</p>
                    <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
       Consulter les postes à pouvoir</p>
              </div>
              <div className="col-md-4 services">
                <img src="images/service1.jpg" className="service-img" />
                <h4>L'image de Marque en ligne</h4>
                <p>N'attendez plus pour nous Contacter, Vous satisfaire est notre raison d'etre</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                Consulter les postes à pouvoir</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                 Consulter les postes à pouvoir</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                  Consulter les postes à pouvoir</p>
              </div>
              <div className="col-md-4 services">
                <img src="images/service3.jpg" className="service-img" />
                <h4>Sécurité mobile </h4>
                <p>Solutions de dissuasion, d’assistance et de vérification pour contrôler la sécurité de votre site.</p>

              </div>
            </div>
            <button type="button" className="btn btn-primary">All Services</button>
          </div>
        </section>

        <section id="social-media">
          <div className="container text-center">
            <p>Retrouvez nous sur les réseaux sociaux</p>
            <div className="social-icons">
              <a href="#" ><img src="images/facebook-icon.png" /></a>
              <a href="#" ><img src="images/instagram-icon.png" /></a>
              <a href="#" ><img src="images/whatsapp-icon.jpg" /></a>
              <a href="#" ><img src="images/linkedin-icon.png" /></a>
              <a href="#" ><img src="images/twitter-icon.png" /></a>
            </div>
          </div>
        </section>
       
        </div>
       
  )
 }
      

export default Home;
