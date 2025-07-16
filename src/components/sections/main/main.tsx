import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./main.css";
import { FaGithub } from "react-icons/fa";
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import UseWindowWidth from "../../ui/windowWidth/WindowWidth";
import { motion, useAnimation, useInView } from "framer-motion";
import { Element } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.05 });
  const width = UseWindowWidth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth] = useState(window.innerWidth);
  const controls = useAnimation();
  const stackRef = useRef(null);
  const isStackInView = useInView(stackRef, { once: false, amount: 0.1 });

  const icons = [
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiExpress,
    SiJavascript,
    SiAngular,
    SiDocker,
    FaJava,
    SiSpringboot,
  ];

  const colors = [
    "#61DAFB", // React
    "#339933", // Node.js
    "#4DB33D", // MongoDB
    "#ffffffff", // Express
    "#F7DF1E", // JavaScript
    "#DD0031", // Angular
    "#0db7ed", // Docker
    "#007396", // Java
    "#6DB33F", // Spring Boot
  ];


  const iconVariants = {
    hidden: { opacity: 0, x: 90 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: i * 0.3, // delay aumenta a cada indice
      },
    }),
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth);
    }
  }, [windowWidth]); // recalc on window resize

  useEffect(() => {
    if (!containerWidth) return;

    
    const mobileScrollOffset = width < 1000 ? 80 : 0;
    let scrollDistance = containerWidth - windowWidth - mobileScrollOffset;
    const lastPanel = containerRef.current?.lastElementChild as HTMLElement;

    if (scrollDistance <= 0) return;

    if (width < 1000 && lastPanel) {
      const lastCardOffset = lastPanel.offsetLeft + lastPanel.offsetWidth;
      scrollDistance = lastCardOffset - windowWidth;
    }

  //lógica pra animação dentro do começar
    gsap.to(containerRef.current, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: width < 1000 ? "#title-sectionCards" : ".container-stack",
        start: width < 1000 ? "top top" : "top bottom",
        endTrigger: "#title-contactForm",
        end: width < 1000 ? `+=${scrollDistance + 100}` : `top 1%`,
        scrub: true,
        markers: false,
      },
    });

    console.log("valor do width", width);

    // ScrollTrigger só para fixar os cards no meio (pin)
    ScrollTrigger.create({
      trigger: ".panels",
      start: "top 1%",
      end: width < 1000 ? `+=${scrollDistance + 100}` : "bottom 5%", //tava bottom 70
      pin: ".horizontal-section",
      scrub: true,
      markers: false,
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, [containerWidth, windowWidth]);

  useEffect(() => {
    if (isStackInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isStackInView, controls]);

  return (
    <motion.div className="wrapper" ref={ref}>
      <div id="description-me">
        <Element name="summary">
          <motion.p
            initial={{ opacity: 0, y: 90 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            id="aboutMe"
          >
            Sobre mim
          </motion.p>
        </Element>

        <motion.p
          id="summaryMe"
          initial={{ opacity: 0, y: 90 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Desenvolvedor focado em aplicações web modernas, com experiência
          prática na stack MERN, Java (Spring Boot) e Angular. Atuo na
          construção de APIs, integração entre microsserviços e conteinerização
          de aplicações com Docker. Também desenvolvi interfaces interativas com
          React Three Fiber, sempre priorizando usabilidade, performance e
          organização do código.
        </motion.p>

        <div className="container-stack">
          <motion.p
            initial={{ opacity: 0, y: 90 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Stack de Desenvolvimento
          </motion.p>
          <div className="container-iconsStack" ref={stackRef}>
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={iconVariants}
                initial="hidden"
                animate={isStackInView ? controls : false}
              >
                <Icon
                  style={{
                    color: colors[index],
                    width: "40px",
                    height: "40px",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 90 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        id="title-sectionCards"
      >
        Projetos em Destaque
      </motion.p>
      <section className="horizontal-section">
        <div className="panels" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="panel"
          >
            <p>Portal de Vagas simplificado</p>
            <img src={`${import.meta.env.BASE_URL}printsProject/PageHome.png`} alt="project-portal-job" />
            <p>
              Plataforma de vagas com login via Google, onde usuários criam,
              editam e se candidatam a oportunidades. Interface simples e
              funcional com foco em empregabilidade.
            </p>

            <a
              href="https://github.com/404GabrielDev/Job-Portal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button id="btnRepository">
                Repositório <FaGithub size={30} color="#fff" />
              </button>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="panel"
          >
            <p>Showroom</p>
            <img src={`${import.meta.env.BASE_URL}printsProject/homePage.png`} alt="project-showroom" />
            <p>
              Página interativa em 3D com modelos de carros rotacionáveis.
              Desenvolvida com React Three Fiber, focada em visual moderno e
              leveza.
            </p>

            <a
              href="https://github.com/404GabrielDev/car-3d-showroom"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button id="btnRepository">
                Repositório <FaGithub size={30} color="#fff" />
              </button>
            </a>
          </motion.div>
          <motion.div
            className="panel"
            initial={{ opacity: 0, x: 90 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p>Marketplace</p>
            <img
              src={`${import.meta.env.BASE_URL}printsProject/Screenshot1.png`}
              alt="project-marketplace"
            />
            <p>
              Sistema simplificado para compra e venda de carros com propostas
              privadas, autenticação via JWT, controle de acesso e implantação
              com Docker para ambiente consistente e fácil setup.
            </p>

            <a
              href="https://github.com/404GabrielDev/Projeto-Marketplace-de-Carros"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button id="btnRepository">
                Repositório <FaGithub size={30} color="#fff" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default About;
