import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PrivateRoute from './context/PrivateRoute'
import AsambleaList from './pages/asambleas/AsambleaList'
import Asamblea from './pages/asambleas/Asamblea'

function App () {

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/asambleas" element={<PrivateRoute><AsambleaList /></PrivateRoute>} />
          <Route path="/asamblea/:id" element={<PrivateRoute><Asamblea /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
