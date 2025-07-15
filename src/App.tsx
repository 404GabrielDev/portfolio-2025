import { useEffect, useRef } from "react";
import "./App.css";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/navbar";
import ModelViewer from "./components/model3D/LostProgrammer";
import Hero from "./components/sections/hero/Hero";
import About from "./components/sections/main/main";
import Lenis from "lenis";
import ContactForm from "./components/layout/email/Email";

import AOS from "aos";
import "aos/dist/aos.css";
import { scroller } from "react-scroll";
import { UseLoading } from "./context/loadingContext/LoadingContext";
import LoadingPage from "./components/ui/loadingPage/LoadingPage";
import ModelPreloader from "./components/ui/ModelPreloader/ModelPreLoader";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";


//AOS conforme documentação

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 30, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 600, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

function App() {
  const lenisRef = useRef<Lenis>(null);
  useAutoScrollUnlessUserInteracts();
  const { loadingPage, loadingComponents } = UseLoading();

  useEffect(() => {
    lenisRef.current = new Lenis();

    function raf(time:number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  function useAutoScrollUnlessUserInteracts() {
    useEffect(() => {
      const timeout = setTimeout(() => {
        scroller.scrollTo("header", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }, 2500);

      const cancelScroll = () => {
        clearTimeout(timeout);
        window.removeEventListener("pointerdown", cancelScroll);
        window.removeEventListener("wheel", cancelScroll);
        window.removeEventListener("keydown", cancelScroll);
      };

      window.addEventListener("pointerdown", cancelScroll, { once: true });
      window.addEventListener("wheel", cancelScroll, { once: true });
      window.addEventListener("keydown", cancelScroll, { once: true });

      return () => {
        clearTimeout(timeout);
        cancelScroll();
      };
    });
  }

  return (
    <>
    {/*teste em componente principal */}
      <ModelPreloader />
      <AnimatePresence initial={true}>
        {loadingPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="motion-loading"
          >
            {loadingPage && <LoadingPage />}
          </motion.div>
        )}
      </AnimatePresence>

      {loadingComponents && (
        <>
          <Navbar />
          <ModelViewer />
          <Hero />
          <About />
          <ContactForm />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
