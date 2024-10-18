import { IconUserCode } from "../components/icons/Icons";

const About = () => {
  const items = [
    {
      title: "Sobre mí",
      description:
        "Soy Gabriel Agüero, Licenciado en Enfermería y Programador Front end. Soy un profesional con experiencia en el desarrollo de aplicaciones web y mi deseo es crear soluciones que mejoren la experiencia de los usuarios.",
      icons: <IconUserCode />,
    },
    {
      title: "Objetivo",
      description:
        "Esta aplicación fue creada para mejorar la gestión del carro de paro en hospitales y clínicas, facilitando el control de medicamentos, descartables y gestionando su vencimiento. El objetivo principal es optimizar el proceso de verificación en tiempo y calidad, y reducir los errores por vencimientos a la hora de requerir el uso del carro de paro, proporcionando una herramienta simple y accesible para los profesionales de la salud.",
      icons: <IconUserCode />,
    },
    {
      title: "Fundamentos",
      description:
        "En un entorno crítico como el hospitalario, contar con información precisa y actualizada es clave para salvar vidas. Esta aplicación busca cubrir esa necesidad, ayudando a los equipos de salud a estar siempre preparados.",
    },
    {
      title: "Tecnologías Utilizada",
      description:
        "La aplicación se ha desarrollado utilizando, HTML, CSS y JavaScript. Además, se ha utilizado React para el front-end y Firebase para el back-end. También se han utilizado diferentes librerías que complementan el sitio web. Finalmente, se ha utilizado Tailwind CSS para dar estilo a la aplicación y proporcionar un diseño atractivo y moderno.",
    },
    {
      title: "Soporte y Mantenimiento",
      description:
        "Nos comprometemos a ofrecer soporte continuo y actualizaciones periódicas para mantener la aplicación al día con los últimos avances tecnológicos y normativos",
    },
    {
      title: "Colabora",
      description:
        "Tu contribución es importante. Si tienes ideas o mejoras, no dudes en compartirlas. Juntos podemos optimizar la experiencia y funcionalidad de esta aplicación.",
    },
  ];

  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Acerca de la aplicación
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <>
              <a
                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                href="#"
              >
                {item.icons}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-10 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg> */}

                <h2 className="mt-4 text-xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-gray-300">{item.description}</p>
              </a>
            </>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Ingresa aqui para Colaborar con el Proyecto !!!
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
