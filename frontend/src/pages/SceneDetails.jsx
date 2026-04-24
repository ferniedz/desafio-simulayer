import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import CharacterItem from '../components/CharacterItem';
import useFetchSceneDetails from '../hooks/useFetchSceneDetails';

const styles = {
    container: "p-8 bg-slate-900 min-h-screen text-white",
    contentWrapper: "bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl",
    btnBack: "mb-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2",
    title: "text-3xl font-bold text-blue-400 mb-2",
    description: "mt-4 text-slate-300 leading-relaxed",
    sectionTitle: "text-xl font-semibold mt-8 mb-4 border-b border-slate-700 pb-2 text-slate-200",
    characterItem: "bg-slate-700/50 p-3 rounded-lg border border-slate-600 mb-2 hover:bg-slate-700 transition-colors",
    btnDelete: "mt-8 bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold transition-all duration-200 active:scale-95 shadow-lg",
};

function SceneDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { scene, loading } = useFetchSceneDetails(id);

    const handleDelete = async () => {
        if (window.confirm("Do you really want to delete this scene?")) {
            try {
                await api.delete(`/scenes/${id}`);
                navigate('/');  //volta p/ a listagem de cenas
            } catch (err) {
                alert("Deleting scene error.", err);
            }
        }
    };

    if (loading) return <Loading />
    if (!scene) return <div className="text-red-500 p-10">Scene not found.</div>

    return (
        <div className = { styles.container }>
            <button onClick={() => navigate(-1)} className={styles.btnBack}>← Back</button>

            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>{scene.name}</h1>
                <p className={styles.description}>{scene.description}</p>

                <h2 className={styles.sectionTitle}>Characters</h2>

                {scene.characters?.length > 0 ? (
                    <ul>
                        {scene.characters.map(c => (
                            <CharacterItem key={c.character.id} character={c.character} />
                        ))}
                    </ul>
                    
                ) : (
                    <p className="text-slate-500 italic">No characters in this scene.</p>
                )}

                <button
                    onClick={handleDelete}
                    className={styles.btnDelete}
                >
                Delete scene
                </button>

            </div>
        </div>
    );
}

export default SceneDetails;