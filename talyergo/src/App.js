import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './components/Home.js';
import { PrimaryHeader } from './components/PrimaryHeader.js';
import { Footer } from './components/Footer.js';
import { Shops } from './components/Shops.js';
import { LogIn } from './components/LogIn.js';
import { SignUp } from './components/SignUp.js';
import { Profile } from './components/Profile.js';

function App() {
  return (
    <div className="App">
      <Router>
        <PrimaryHeader />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/shops" element={<Shops />}/>
          <Route path="/log-in" element={<LogIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/profile/:userId" element={<Profile />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
