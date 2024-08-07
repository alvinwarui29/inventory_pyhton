import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './pages/AllItems';
import EditItems from './pages/EditItems';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
    <Header/>
        <Routes>
          <Route path="/" element={<AllItems/>} />
          <Route path="/add-item" element={<AddItems />} />
          <Route path="/edit-item/:id" element={<EditItems/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />


        </Routes>
    </Router>
  );
}

export default App;