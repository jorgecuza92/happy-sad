import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Succeed At Failing Co.</h4>
              <li>Houston, Tampa, Sacramento</li>
              <li>123 Programming Ave.</li>
           
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Developers</h4>
            <ui className="list-unstyled">
              <li>Jorge Cuza </li>
                <li><i class="fab fa-github"></i> <i class="fab fa-linkedin-in"></i></li>

              <li>Mike Warren</li>
                <li><i class="fab fa-github"></i> <i class="fab fa-linkedin-in"></i></li>
                
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Developers cont.</h4>
            <ui className="list-unstyled">
              <li>Fred Lopez</li>
                <li><i class="fab fa-github"></i> <i class="fab fa-linkedin-in"></i></li>

              <li>Hao Dam</li>
                <li><i class="fab fa-github"></i> <i class="fab fa-linkedin-in"></i></li>


            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Succeed At Failing | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
