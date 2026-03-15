import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Pages ko import kar rahe hain
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import SignIn from './pages/SignIn';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <nav style={{ 
          padding: '15px 50px', 
          background: '#1a1a1a', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ color: '#ff4d4d', margin: 0 }}>SeaSide 🍴</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>About</Link>
            <Link to="/menu" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Menu</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
            <Link to="/signin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>

        {/* Footer Section - Ab ye Router aur Div ke andar hai */}
        <footer style={{ 
          background: '#1a1a1a', 
          color: 'gray', 
          textAlign: 'center', 
          padding: '20px', 
          fontSize: '0.9rem'
        }}>
          <p>© 2026 SeaSide Restaurant | Built with React by [Aapka Naam]</p>
          <p>Follow us on: Instagram | Facebook | Twitter</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;