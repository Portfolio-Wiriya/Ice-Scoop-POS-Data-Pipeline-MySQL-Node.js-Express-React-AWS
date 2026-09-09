import logo from './assets/svg/logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AdminLogin from './hooks/authentication/AdminLogin.js';
import POSView from './pages/POSView.js';
import InventoryView from './pages/InventoryView.js';
import DashBoard from './pages/DashBoard.js';
import { StockProvider } from './context/StockContext.js';
// import Header from './complement/Header.js';
// import TaskBar from './complement/TaskBar.js';


function HomePage() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>ICE - SCOOP</p>
        
        <Link className="App-link" to="/AdminLogin">
          Admin Login
        </Link>
      </header>
  );
}
 
function App() {
  return (
    <StockProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/AdminLogin" element = { <AdminLogin/>}/>
            <Route path = "/POSView" element = { <POSView/>}/>
            <Route path = "/InventoryView" element = { <InventoryView/>}/>
            <Route path = "/DashBoard" element = { <DashBoard/>}/>
          </Routes>
        </div>
      </Router>
    </StockProvider>
  );
}

export default App;
