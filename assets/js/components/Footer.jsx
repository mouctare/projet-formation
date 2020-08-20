import React from 'react'

export default function Footer() {
    return (
        <div>
             <section id="footer">
          
          <div className="container">
            <div className="row">
              <div className="col-md-4 footer-box">
                <img src="images/logo.png" />
                <p>N'attendez plus pour nous Contacter, Vous satisfaire est notre raison d'etre</p>
                <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                   métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                   Consulter les postes à pouvoir</p>
              </div>
              <div className="col-md-4 footer-box">
                <p><b>Contacter-nous</b></p>
                <p><i className="fa fa-map-marker" />Place de la Gare , Grenoble</p>
                <p><i className="fa fa-phone" />06552675</p>
                <p><i className="fa fa-envelope-o" />test@gmail.com</p>

              </div>
              <div className="col-md-4 footer-box">
                <p><b>SOUSCRIRE A NOTRE NEWSLETTER</b></p>
                <input type="email" className="form-control" placeholder="Votre Email" />
                <button type="button" className="btn btn-primary">Souscrire</button>
              </div>
            </div>
            <hr />
            <p className="copyright">Site Créer Par Les Pro</p>
          </div>
       </section> 
        </div>
    )
}
