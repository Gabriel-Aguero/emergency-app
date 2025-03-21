import "./App.css";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import FormCheckListCart from "./pages/FormCheckListCart.jsx";
import { Routes, Route } from "react-router-dom";
import FormData from "./pages/FormData.jsx";
import Navbar from "./components/Navbar.jsx";
import { ProtectedRoutes } from "./components/ProtectedRoutes.jsx";
import Footer from "./components/Footer.jsx";
import { Contacto } from "./pages/Contacto.jsx";
import FormResetPassword from "./pages/FormResetPassword.jsx";
import About from "./pages/About.jsx";
import QRcode from "./components/QRcode.jsx";
import { ContainerElementsCart } from "./pages/ContainerElementsCart.jsx";
import TerminosyCondiciones from "./pages/TerminosyCondiciones.jsx";
import PoliticaDePrivacidad from "./pages/PoliticaDePrivacidad.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Lleva el scroll al inicio
  }, [location.pathname]); // Ejecuta el efecto cada vez que cambia la ruta

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check_carros" element={<FormCheckListCart />} />
        <Route path="/formulario_de_datos" element={ <FormData /> } />
        <Route path="/elementos_del_carro/:idCarro" element={<ContainerElementsCart />} />
        <Route path="/reset_password" element={<FormResetPassword />} />
        <Route path="/terminos_y_condiciones" element={<TerminosyCondiciones />} />
        <Route path="/politicas_de_privacidad" element={<PoliticaDePrivacidad />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/qrcode" element={<QRcode />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
