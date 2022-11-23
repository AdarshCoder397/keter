import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home'

function App() {
  return (
    <div className="App">
      <Router>
    <Navbar />
        <Routes>
          <Route path='/home' element={<><Home /></>}/>
          <Route path='/' element={<><Home /></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
