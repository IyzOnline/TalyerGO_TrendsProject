import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './components/Home.js';
import { PrimaryHeader } from './components/PrimaryHeader.js';
import { Footer } from './components/Footer.js';
import { Shops } from './components/Shops.js';
import { LogIn } from './components/LogIn.js';
import { SignUp } from './components/SignUp.js';
import { Profile } from './components/Profile.js';
import { About } from './components/About.js';
import MyShop from './components/MyShop.js';
import { Logout } from './components/Logout.js';

function App() {
  return (
    
    <div className="App">
      <Router>
        <PrimaryHeader />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/shops" element={<Shops />}/>
          <Route path="/log-in" element={<LogIn />}/>
          <Route path="/my-shop" element={<MyShop />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:userId" element={<Profile />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
