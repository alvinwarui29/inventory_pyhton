import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './pages/AllItems';
import EditItems from './pages/EditItems';
import Header from './components/Header';

function App() {
  return (
    <Router>
    <Header/>
        <Routes>
          <Route path="/" element={<AllItems/>} />
          <Route path="/add-item" element={<AddItems />} />
          <Route path="/edit-item/:id" element={<EditItems/>} />

        </Routes>
    </Router>
  );
}

export default App;