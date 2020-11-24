import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-text">
        <h3>Copyright &copy; 2020. All rights reserved</h3>
      </div>
      <div className="footer-icons">
        <a href="#">
          <i className="fab fa-facebook" />
        </a>
        <a href="#">
          <i className="fab fa-twitter" />
        </a>
        <a href="#">
          <i className="fab fa-instagram" />
        </a>
        <a href="#">
          <i className="fab fa-google-plus" />
        </a>
        <a href="https://www.linkedin.com/in/r-diallo/">
          <i className="fab fa-linkedin" />
        </a>
      </div>
    </footer>
  );
}
