import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './components/Home.js';
import { PrimaryHeader } from './components/PrimaryHeader.js';
import { Footer } from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <Router>
        <PrimaryHeader />
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
