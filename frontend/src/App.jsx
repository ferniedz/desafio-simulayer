import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import SceneDetails from './pages/SceneDetails';
import CreateScene from './pages/CreateScene';
import Characters from './pages/Characters';
import CreateCharacter from './pages/CreateCharacter';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scenes" element={<Home /> } />
            <Route path="/scenes/new" element={<CreateScene />} />
            <Route path="/scenes/:id" element={<SceneDetails />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/new" element={<CreateCharacter />} />
        </Routes>
    );
}

export default App;