import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './pages/AllItems';
import EditItems from './pages/EditItems';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AddItems />} />
          <Route path="/all-items" element={<AllItems/>} />
          <Route path="/edit-item/:id" element={<EditItems/>} />

        </Routes>
    </Router>
  );
}

export default App;