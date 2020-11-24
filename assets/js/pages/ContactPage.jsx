import React from "react";

const ContactPage = () => (
  <section className="contact">
    <div className="content">
      <h2>Contact</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis ...
      </p>
    </div>
    <div className="container-cont">
      <div className="contactInfo">
        <div className="box">
          <div className="icon">
            <i className="fa fa-map-marker" aria aria-hidden="true" />
          </div>
          <div className="text">
            <h3>Address</h3>
            <p>
              9 Rue Lous de La Bastille, <b>Grenoble, Eybens, </b>38100
            </p>
          </div>
        </div>
        <div className="box">
          <div className="icon">
            <i className="fa fa-phone" aria aria-hidden="true" />
          </div>
          <div className="text">
            <h3>Telephone</h3>
            <p>047566788</p>
          </div>
        </div>
        <div className="box">
          <div className="icon">
            <i className="fa fa-envelope" aria aria-hidden="true" />
          </div>
          <div className="text">
            <h3>Email</h3>
            <p>entropo@gmail.com</p>
          </div>
        </div>
      </div>
      {/*  <div className="contactForm">
            <form>
              <h2>Envoyer un message</h2>
              <div className="inputBox">
                <input type="text" name="" required="required" />
                <span>Votre Entreprise</span>
                </div>
                <div className="inputBox">
              <input type="text" name="" required="required" />
              <span>Email</span>
              </div>
              <div className="inputBox">
              <textarea required="required" />
              <span>Detail de votre Message...</span>
              </div>
              <div className="inputBox">
              <input type="submit" name="" value="Envoyer" />
            </div>
            </form>
          </div> */}
    </div>
  </section>
);

export default ContactPage;
