
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import './pages/Form.tsx'
import Form from './pages/Form.tsx'; 
import Task from './pages/Task.tsx'
import Navbar from './components/Navbar';
import Footer from './components/Footer.tsx';




const App = () => {
  return (
    <Router>
    
      <div>
        <Navbar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />} />
          <Route path="/sign-up" element={<Form />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};


export default App
