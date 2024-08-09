import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './pages/AllItems';
import EditItems from './pages/EditItems';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

function App() {
  return (
    <Router>
    <Header/>
        <Routes>
        <Route path="/" element={<ProtectedRoute element={AllItems} />} />
        <Route path="/add-item" element={<ProtectedRoute element={AddItems} />} />
        <Route path="/edit-item/:id" element={<ProtectedRoute element={EditItems} />} />
        <Route path="/login" element={<UnprotectedRoute element={Login} />} />
        <Route path="/register" element={<UnprotectedRoute element={Register} />} />


        </Routes>
    </Router>
  );
}

export default App;