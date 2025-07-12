import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="container-logo">
        <img src="/images/Logo.webp" alt="logo" />
      </div>

      <div className="container-contact">
        <a
          href="https://wa.me/5561986641977"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button id="btnContact">Contato</button>
        </a>
      </div>

      <div className="container-Msocial">
        <p>Redes Sociais</p>
        <div className="social-icons">
          <a
            href="https://github.com/404GabrielDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} color="#fff" />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-gabriel-s-b22407365/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} color="#0A66C2" />
          </a>
        </div>
      </div>

      <p id="footer-copyright">
        © João Gabriel 2025 • Desenvolvedor Full Stack
      </p>
    </footer>
  );
}

export default Footer;
