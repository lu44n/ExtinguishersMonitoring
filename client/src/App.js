import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } 
        />   
      </Routes>
    </Router>
  );
}

export default App;
