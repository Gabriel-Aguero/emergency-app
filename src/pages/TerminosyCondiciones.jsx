const TerminosyCondiciones = () => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10 px-4 md:px-20">
      <h1 className="text-2xl md:text-4xl font-bold mb-10 text-pretty text-center">
        Términos y Condiciones
      </h1>
      <p className="text-lg md:text-xl leading-relaxed mb-4">
        Última actualización: {today}
      </p>

      <div className="space-y-6 text-sm md:text-base leading-relaxed p-10">
        <h2 className="font-semibold text-lg">1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar nuestro sitio web (
          <a
            href="https://emergency-app-gabrielagueros-projects.vercel.app/"
            className="text-blue-600 hover:underline"
          >
            https://emergency-app-gabrielagueros-projects.vercel.app/
          </a>
          ), aceptas cumplir con estos Términos y Condiciones. Si no estás de
          acuerdo con alguno de los términos aquí establecidos, te pedimos que
          no utilices nuestro Sitio.
        </p>

        <h2 className="font-semibold text-lg">2. Uso del Sitio</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <span className="font-semibold">2.1</span> Puedes utilizar este
            Sitio para informarte, interactuar con nuestros servicios, y otros
            fines personales o comerciales, siempre y cuando no infrinjas las
            restricciones establecidas en estos Términos.
          </li>
          <li>
            <span className="font-semibold">2.2</span> Estás de acuerdo en no
            realizar actividades ilícitas, dañar la reputación del Sitio,
            interferir con la experiencia de otros usuarios o utilizar el Sitio
            para realizar actividades de fraude.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">3. Propiedad Intelectual</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <span className="font-semibold">3.1</span> Todo el contenido, como
            textos, gráficos, logos, imágenes, y software disponible en el
            Sitio, es propiedad de Hector Gabriel Agüero o de nuestros
            licenciantes y está protegido por las leyes de derechos de autor y
            de propiedad intelectual.
          </li>
          <li>
            <span className="font-semibold">3.2</span> No puedes reproducir,
            distribuir, modificar o utilizar este contenido sin nuestro
            consentimiento expreso por escrito.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">4. Enlaces Externos</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <span className="font-semibold">4.1</span> Nuestro Sitio puede
            contener enlaces a sitios de terceros. No somos responsables del
            contenido o las políticas de privacidad de estos sitios externos, y
            el uso de estos enlaces es bajo tu propio riesgo.
          </li>
          <li>
            <span className="font-semibold">4.2</span> No garantizamos la
            veracidad, integridad o seguridad de los sitios vinculados y no
            asumimos responsabilidad alguna por cualquier pérdida o daño
            derivado de tu uso de dichos sitios.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">
          5. Limitación de Responsabilidad
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <span className="font-semibold">5.1</span> No nos hacemos
            responsables de ningún daño directo, indirecto, incidental o
            consecuente que resulte del uso o de la imposibilidad de uso de
            nuestro Sitio.
          </li>
          <li>
            <span className="font-semibold">5.2</span> En la medida máxima
            permitida por la ley, nuestra responsabilidad queda limitada a la
            cantidad que hayas pagado, en su caso, por los servicios recibidos
            en el Sitio.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">
          6. Modificaciones a los Términos
        </h2>
        <p>
          Podemos actualizar estos Términos y Condiciones periódicamente.
          Notificaremos cualquier cambio relevante mediante la publicación de
          los Términos modificados en esta página, y la fecha de actualización
          será reflejada al inicio de los mismos.
        </p>

        <h2 className="font-semibold text-lg">7. Terminación del Servicio</h2>
        <p>
          Nos reservamos el derecho de restringir o finalizar tu acceso al Sitio
          si consideramos que has incumplido estos Términos o has participado en
          actividades que puedan perjudicar el Sitio o a otros usuarios.
        </p>

        <h2 className="font-semibold text-lg">8. Ley Aplicable</h2>
        <p>
          Los Términos y Condiciones de Uso aquí presentados se rigen por las
          leyes de la República Argentina, en particular:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            LEY 25.326 - PROTECCIÓN DE DATOS PERSONALES Y SUS NORMAS
            COMPLEMENTARIAS
          </li>
          <li>LEY 11.723 - REGIMEN LEGAL DE LA PROPIEDAD INTELECTUAL</li>
        </ul>
        <p>
          En caso de surgir cualquier controversia respecto de la interpretación
          o cumplimiento de los presentes, el Administrador y el Usuario se
          someten a los Tribunales Nacionales en lo Contencioso Administrativo.
        </p>

        <h2 className="font-semibold text-lg">9. Contáctanos</h2>
        <p>
          Si tienes alguna pregunta o comentario sobre estos Términos y
          Condiciones, puedes contactarnos en:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Correo electrónico: [gabriel.aguero.developer@gmail.com]</li>
        </ul>
      </div>
    </div>
  );
};

export default TerminosyCondiciones;
