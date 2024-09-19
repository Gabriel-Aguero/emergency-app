export const Contacto = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <span className="text-xl text-blue-600 font-semibold">
              ¡Ayuda a crecer y mejorar! 🚀
            </span>
            <p className="max-w-xl text-lg mt-2">
              Estoy comprometido en ofrecerte la mejor experiencia posible.
              <span className="underline decoration-orange-500 decoration-2">
                Tus ideas, sugerencias y comentarios son fundamentales para el
                crecimiento y la mejora contínua de nuestra herramienta.
              </span>{" "}
              Si tienes alguna recomendación o has encontrado alguna oportunidad
              para mejorar, no dudes en ponerte en contacto conmigo. Juntos,
              podemos potenciar el uso de esta plataforma y adaptarla aún más a
              tus necesidades.{" "}
              <span className="text-pink-600 font-bold">
                ¡Tu feedback es clave para el futuro de nuestra solución!
              </span>
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex flex-col gap-2 items-center justify-center">
                <h4 className="text-center text-sm font-semibold">
                  Feedback 👍
                </h4>
                <img
                  src="/public/feedback.svg"
                  alt=""
                  className="h-36 w-36 bg-blue-600/60 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-center text-sm font-semibold">
                  Comparte ideas 🙋‍♂️
                </h4>
                <img
                  src="/public/ideas.svg"
                  alt=""
                  className="h-36 w-36 bg-pink-600/60 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-center text-sm font-semibold">Apoya 🤝</h4>
                <img
                  src="/public/testing.svg"
                  alt=""
                  className="h-36 w-36 bg-violet-600/60 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="#" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Nombre
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Nombre"
                  type="text"
                  id="name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email"
                    type="email"
                    id="email"
                  />
                </div>
              </div>          

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows="8"
                  id="message"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
