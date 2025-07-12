import "./Email.css";
import { useRef } from "react";
import emailJs from "emailjs-com";
import { motion, useInView } from "framer-motion";
import { Element } from 'react-scroll';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const currentForm = formRef.current;
    console.log("Valor do form", formRef);

    emailJs
      .sendForm(
        "service_zst5r1l",
        "template_esp1st9",
        formRef.current,
        "zsUO0yDf20g0Bq55C"
      )
      .then(
        () => {
          alert("Mensagem enviada com sucesso!");
          currentForm.reset();
        },
        (error) => {
          alert("Erro ao enviar. Tente novamente");
          console.error(error);
        }
      );
  };

  return (
    <Element name="formularioContact">
    <form ref={formRef} onSubmit={sendEmail}>
      <p data-aos="fade-up" id="title-contactForm">
        Pronto para construir soluções juntos.
      </p>
      <input
        data-aos="fade-up"
        type="text"
        name="name"
        placeholder="Seu nome"
        required
      />
      <input
        data-aos="fade-up"
        type="email"
        name="email"
        placeholder="Seu e-mail"
        required
      />
      <textarea
        data-aos="fade-up"
        name="message"
        placeholder="Compartilhe sua ideia ou solicitação"
        required
      />
      <button data-aos="fade-up" id="btn-submitEmail" type="submit">
        Enviar
      </button>
    </form>
    </Element>
  );
}
