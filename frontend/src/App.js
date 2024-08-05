import AddItems from './pages/AddItems';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AddItems />} />
          
        </Routes>
    </Router>
  );
}

export default App;