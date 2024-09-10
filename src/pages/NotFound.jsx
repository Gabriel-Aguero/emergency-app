const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Pagina no encontrada
      </h1>
      <img src="/public/404.svg" alt="404" className="h-full sm:h-96" />
    </div>
  );
};

export default NotFound;
