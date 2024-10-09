import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Footer } from './components/Footer';
import { ForgotPassword } from './pages/ForgotPassword';
import { Consulta } from './pages/Consulta';
import { Gerenciar } from './pages/Gerenciar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/home" 
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/consulta" 
          element={
            <>
              <Navbar />
              <Consulta />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/gerenciar" 
          element={
            <>
              <Navbar />
              <Gerenciar />
              <Footer />
            </>
          } 
        />   
      </Routes>
    </Router>
  );
}

export default App;
