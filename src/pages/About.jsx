const About = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Acerca de</h1>
            {/* Sección sobre los objetivos de la aplicación */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Objetivos de la Aplicación</h2>
              <p className="text-gray-700 text-lg leading-7">
                Esta aplicación fue creada para mejorar la gestión del carro de paro en hospitales y clínicas, facilitando
                el control de medicamentos, descartables y gestionando su vencimiento. El objetivo principal es optimizar el proceso de verificación
                en tiempo y calidad, y reducir los errores por vencimientos a la hora de requerir el uso del carro de paro, 
                proporcionando una herramienta simple y accesible para los profesionales de la salud.
              </p>
              <p className="text-gray-700 text-lg leading-7 mt-4">
                En un entorno crítico como el hospitalario, contar con información precisa y actualizada es clave para
                salvar vidas. Esta aplicación busca cubrir esa necesidad, ayudando a los equipos de salud a estar siempre preparados.
              </p>
            </section>

            {/* Sección sobre ti */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Sobre el Desarrollador</h2>
              <p className="text-gray-700 text-lg leading-7">
                Hola, mi nombre es <strong>Gabriel Aguero</strong>, soy un desarrollador frontend de Argentina con una amplia
                experiencia en tecnología y salud. Mi formación incluye una Tecnicatura en Sistemas, una Licenciatura en
                Enfermería y una Maestría en Informática en Salud. Actualmente, combino mi conocimiento en informática en salud con el desarrollo
                de aplicaciones web que mejoran la eficiencia de los entornos hospitalarios.
              </p>
            </section>                        
          </div>
        </div>
      );
}

export default About;