import { IconCoffe } from "../components/icons/Icons";

const About = () => {
  const items = [
    {
      title: "Sobre mí",
      description:
        "👋 Hola soy Gabriel Agüero, Licenciado en Enfermería y Programador Front end. Soy un profesional con experiencia en el desarrollo de aplicaciones web y mi deseo es crear soluciones que mejoren la experiencia de los usuarios.",
      icons: "👨‍💻",
    },
    {
      title: "Objetivo",
      description:
        "Esta aplicación fue creada para mejorar la gestión del carro de paro en hospitales y clínicas, facilitando el control de medicamentos, descartables y gestionando su vencimiento. El objetivo principal es optimizar el proceso de verificación en tiempo y calidad, y reducir los errores por vencimientos a la hora de requerir el uso del carro de paro, proporcionando una herramienta simple y accesible para los profesionales de la salud.",
      icons: "⚡",
    },
    {
      title: "Fundamentos",
      description:
        "En un entorno crítico como el hospitalario, contar con información precisa y actualizada es clave para salvar vidas. Esta aplicación busca cubrir esa necesidad, ayudando a los equipos de salud a estar siempre preparados.",
      icons: "📊",
    },
    {
      title: "Tecnologías Utilizada",
      description:
        "La aplicación se ha desarrollado utilizando, HTML, CSS y JavaScript. Además, se ha utilizado React para el front-end y Firebase para el back-end. También se han utilizado diferentes librerías que complementan el sitio web. Finalmente, se ha utilizado Tailwind CSS para dar estilo a la aplicación y proporcionar un diseño atractivo y moderno.",
      icons: "💻",
    },
    {
      title: "Soporte y Mantenimiento",
      description:
        "Nos comprometemos a ofrecer soporte continuo y actualizaciones periódicas para mantener la aplicación al día con los últimos avances tecnológicos y normativos",
      icons: "💬",
    },
    {
      title: "Colabora",
      description:
        "Tu contribución es importante. Si tienes ideas o mejoras, no dudes en compartirlas. Juntos podemos optimizar la experiencia y funcionalidad de esta aplicación.",
      icons: "🤝",
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
                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-cyan-500/10 hover:shadow-cyan-500/10"
                href="#"
              >
                <span className="text-5xl font-bold text-white">
                  {item.icons}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="mt-4 text-md text-gray-300">{item.description}</p>
              </a>
            </>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-300 text-pretty border p-4 rounded-lg mb-5">
            * Los servicios de la aplicación proporcionan gastos que son cuenta
            del programador para mantenerla en funcionamiento y constante
            actualización. Si quieres colaborar puedes haciendo click en el
            botón de abajo 👇
          </p>
          <a
            href="https://cafecito.app/gabyaguero"
            className="inline-block rounded bg-cyan-600 px-12 py-3 font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            <IconCoffe />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
