import React from 'react'

export default function SolutionPage() {
    return (
        <header>
        <section id="services">
        <div className="title">
        <div className="title-text">
            <h1>Solutions</h1>
            </div>
            <div className="title-underline"></div>
          </div>


          <div className="services-container">
              <article className="service-item service-item-black">
                  <div className="front-text">
                  <i className="fas fa-fire-extinguisher" />
                    <h1>Sécurité</h1>
                  </div>
                 <div className="back-text">
                  <h1>Fire and safety</h1>
                     <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                    métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                    Consulter les postes à pouvoir</p>
                    <button type="button">Lire la suite</button>

                 </div>
                 <article className="service-item service-item-white">
                    <div className="front-text">
                    <i class="fas fa-car"></i>
                     <h1>Sécurité mobile </h1>
                    </div>
                    <div className="back-text">
                     <h1>Mobile guarding</h1>
                        <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                        métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                        Consulter les postes à pouvoir</p>
                        <button type="button">Lire la suite</button> 
                        </div>
                 

                </article>

                <article className="service-item service-item-black">
                    <div className="front-text">
                    <i className="fas fa-user-secret"/>
                        <h1>Sûreté</h1>
                    </div>
                
                    <div className="back-text">
                      <h1>On site guarding</h1>
                        <p>Relevez chaque jour des défis stimulants et développer des compétences dans des
                        métiers divers (vente, marketing, RH, digital…) dans un environnement de travail collaboratif et inspirant
                        Consulter les postes à pouvoir</p>
                        <button type="button">Lire la suite</button> 
                        </div>
                 

                </article>

              </article>
          </div>
        </section>

        <section id="projects">
         <div className="title">
            <div className="title-text">
                <h1>Carrière</h1>
                </div>
                <div className="title-underline"></div>
            </div>
    <div className="projects-container">



      <article className="projects-item">
          <img src="/images/camera.png" alt="images"/>
          <div class="img-text">
             <h1>Formez-vous</h1>
             <h6>Se former à la sûreté aéroportuaire</h6>
          </div>
          <div className="img-footer">
              <div className="footer-icon">
                  <i className="fa fa-comments"></i> 0
              </div>
              <div className="footer-date">
                  Decembre 12, 2017
              </div>
          </div>
      </article>
  </div>

            <article className="projects-item">
                <img src="/images/home1.png" alt="images"/>
                <div class="img-text">
                    <h1>Formez-vous</h1>
                    <h6>Se former à la sûreté aéroportuaire</h6>
                </div>
                <div className="img-footer">
                    <div className="footer-icon">
                        <i className="fa fa-comments"></i> 0
                    </div>
                    <div className="footer-date">
                        Decembre 12, 2017
                    </div>
                </div>
            </article>


            <article className="projects-item">
                <img src="/images/home2.jpg" alt="images"/>
                <div class="img-text">
                    <h1>Formez-vous</h1>
                    <h6>Se former à la sécurité incendie</h6>
                </div>
                <div className="img-footer">
                    <div className="footer-icon">
                        <i className="fa fa-comments"></i> 0
                    </div>
                    <div className="footer-date">
                        Decembre 12, 2017
                    </div>
                </div>
            </article>

  
        </section>

        </header>
    )
}
