import { Routes,Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import CustomerList from './pages/CustomerList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path='/' element = {<LoginPage/>} />

        
        <Route path='/customerList' element ={<CustomerList/>}/>
      </Routes>
    </div>
  );
}

export default App;
