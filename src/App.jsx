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
import FormRegisterCart from "./pages/FormRegisterCart.jsx";
import FormInfoCart from "./pages/FormInfoCart.jsx";
import MedicationList from "./pages/MedicationList.jsx";
import QRcode from "./components/QRcode.jsx";
import DescartableList from "./pages/DescartableList.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check_carros" element={<FormCheckListCart />} />
        <Route
          path="/formulario_de_datos"
          element={
            <ProtectedRoutes>
              <FormData />
            </ProtectedRoutes>
          }
        />
        <Route path="/register_info_cart" element={<FormRegisterCart />} />
        <Route path="/info_cart" element={<FormInfoCart />} />
        <Route path="/lista_medicacion" element={<MedicationList />} />
        <Route path="/lista_descartable" element={<DescartableList />} />
        <Route path="/reset_password" element={<FormResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/qrcode" element={<QRcode />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
