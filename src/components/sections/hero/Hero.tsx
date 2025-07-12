import "./Hero.css";

import { Element } from "react-scroll";

function Hero() {
  return (
    <Element name="header">
    <header>
      <video src="/videos/background.mp4" muted autoPlay loop playsInline />

      <div className="container-overlay">
        <p data-aos="fade-left" data-aos-duration="500" data-aos-delay="500" id="title-fullstack">
          FULL-STACK
        </p>

        <p data-aos="fade-right" id="title-developer" data-aos-duration="500" data-aos-delay="600">
          SOFTWARE
        </p>

        <p data-aos="fade-left" data-aos-duration="500" data-aos-delay="700" id="title-software">
          SYSTEMS
        </p>

        <p data-aos="fade-right" data-aos-duration="500" data-aos-delay="800" id="title-engineer">
          DEVELOPER
        </p>
      </div>
    </header>
    </Element>
  );
}

export default Hero;
