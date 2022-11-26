import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <div className="App">
      <Router>
    <Navbar />
        <Routes>
          <Route path='/home' element={<><Home /></>}/>
          <Route path='/' element={<><Home /></>}/>
          <Route path='/About' element={<><About /></>}/>
          <Route path='/Contact' element={<><Contact /></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
