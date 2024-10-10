import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Consulta } from './pages/Consulta';
import { Gerenciar } from './pages/Gerenciar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element=
          {
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/consulta" element=
          {
            <ProtectedRoute>
              <Consulta />
            </ProtectedRoute>
          } 
        />
        <Route path="/gerenciar" element=
          {
            <ProtectedRoute>
              <Gerenciar />
            </ProtectedRoute>
          } 
        />   
      </Routes>
    </Router>
  );
}

export default App;
