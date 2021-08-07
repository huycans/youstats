import React, { useState, useEffect, useRef } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function Footer({ signedin, loading }) {
  //hack to rerender the component after it has loaded
  const [, rerender] = useState();
  const shouldExpandSearchSection = useSelector(
    (state) => state.display.shouldExpandSearchSection
  );

  //hack to determine margin top of footer
  const footerMarginTop = useRef(20); //20px is the default margin top for footer
  //calculate the margin after the first render, then after everytime the user interact with the
  //input element (i.e, typing) and other statuses

  function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = typeof el === "string" ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin =
      parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

    return Math.ceil(el.offsetHeight + margin);
  }

  useEffect(() => {
    footerMarginTop.current =
      window.innerHeight -
      getAbsoluteHeight(document.getElementById("header")) -
      getAbsoluteHeight(document.getElementById("main-content")) -
      150; //150 is footer's height
    rerender({}); // since footerMarginTop ref doesn't cause a rerendering, do this hack to force component to rerender
  }, []);

  useEffect(() => {
    footerMarginTop.current =
      window.innerHeight -
      getAbsoluteHeight(document.getElementById("header")) -
      getAbsoluteHeight(document.getElementById("main-content")) -
      150; //150 is footer's height
  }, [shouldExpandSearchSection, signedin, loading]);
  //end of hack

  return (
    <footer
      style={{
        marginTop:
          footerMarginTop.current > 20 ? footerMarginTop.current + "px" : "20px"
      }}
      className="row footer d-flex justify-content-around align-items-start"
    >
      <div className="col-12 col-md-3">
        <h5>Made by Huy Vuong</h5>
      </div>
      <div className="col-12 col-md-5 tech-used">
        <h5>Written in</h5>
        <ul>
          <li>React, Redux, Typescript</li>
          <li>SCSS, Bootstraps and FontAwesome Icon</li>
          <li>Testing powered by Jest, Testing Library, and MSW</li>
        </ul>
      </div>
      <div className="col-12 col-md-3">
        <h5>You can find me at</h5>
        <ul>
          <li>
            <a
              data-testid="footer-contact-link"
              href="https://github.com/huycans"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a
              data-testid="footer-contact-link"
              href="mailto:h.tvuong07@gmail.com"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>
          <li>
            <a
              data-testid="footer-contact-link"
              href="https://huycans.github.io/"
            >
              My personal site
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
