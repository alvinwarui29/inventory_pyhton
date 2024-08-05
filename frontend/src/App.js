import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './pages/AllItems';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AddItems />} />
          <Route path="/all-items" element={<AllItems/>} />
        </Routes>
    </Router>
  );
}

export default App;