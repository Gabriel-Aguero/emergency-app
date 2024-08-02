import './App.css'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { Routes, Route } from 'react-router-dom';
import FormData from './pages/FormData.jsx';
function App() {

  
  return (    
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/Formulario' element={<FormData/>}/>

      </Routes>
    </div>
  )
}

export default App
