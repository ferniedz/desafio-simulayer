import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import SceneDetails from './pages/SceneDetails';
import CreateScene from './pages/CreateScene';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scenes" element={<Home /> } />
            <Route path="/scenes/new" element={<CreateScene />} />
            <Route path="/scenes/:id" element={<SceneDetails />} />
        </Routes>
    );
}

export default App;