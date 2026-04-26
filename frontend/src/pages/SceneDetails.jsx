import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import CharacterItem from '../components/CharacterItem';
import useFetchSceneDetails from '../hooks/useFetchSceneDetails';
import styles from  '../styles/globalStyles';

function SceneDetails() {
    const { id } = useParams();
    const { scene, loading, refresh } = useFetchSceneDetails(id);
    const [allCharacters, setAllCharacters] = useState([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState("");
    const [addStatus, setAddStatus] = useState(null);
    const [setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/characters')
            .then(res => setAllCharacters(res.data))
            .catch(err => console.error("Error loading character.", err));
    }, []);

    const handleRemoveCharacter = async (characterId) => {      //passado p/ o CharacterItem
        if (window.confirm("Remove this character from this scene?")) {
            try {
                await api.post(`/scenes/${id}/characters`, {
                    characterId,
                    action: "remove"
                });
                refresh();
            } catch (err) {
                console.error("Error removing character.", err);
                setError("Error removing character.");
            }
        }
    };

    const handleAddCharacter = async (e) => {
        e.preventDefault();

        if (!selectedCharacterId) {
            return;
        }
        try {
            await api.post(`/scenes/${id}/characters`, {
                characterId: selectedCharacterId,
                action: "add"
            });
            setSelectedCharacterId("");      //limpa setSelectedCharacterId
            refresh();
        } catch (err) {
            console.error("Error adding character.", err);
            setError("Error adding character.");
        }
    };

    const handleDeleteScene = async () => {
        if (window.confirm("Do you really want to delete this scene?")) {
            try {
                await api.delete(`/scenes/${id}`);
                navigate('/');
            } catch (err) {
                console.error("Error deleting scene.", err);
                setError("Erro deleting scene.");
            }
        }
    };

    if (loading) return <Loading />
    if (!scene) return <div className="text-red-500 p-10">Scene not found.</div>

    const characterIdInScene = scene.characters?.map(c => c.character.id) ?? [];
    const availableCharacters = allCharacters.filter(c => !characterIdInScene.includes(c.id))

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.btnBack}>← Back</button>

            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>{scene.name}</h1>
                <p className={styles.description}>{scene.description}</p>

                <h2 className={styles.sectionTitle}>Characters in this scene</h2>

                {scene.characters?.length > 0 ? (
                    <ul className="space-y-2">
                        {scene.characters.map(c => (
                            <CharacterItem
                                key={c.character.id}
                                character={c.character}
                                onRemove={handleRemoveCharacter}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className={styles.emptyMessage}>No characters in this scene.</p>
                )}

                <h2 className={styles.sectionTitle}>Add a character to this scene</h2>

                {availableCharacters.length === 0 ? (
                    <p className={styles.emptyMessage}>
                        {allCharacters.length === 0
                            ? "No characters registered."
                            : "All existing characters are already in this scene."
                        }
                    </p>
                ) : (
                    <form onSubmit={handleAddCharacter} className="flex gap-3 items-center">
                        <label className={styles.label}>Select character</label>
                            <select
                                className={styles.select}
                                value={selectedCharacterId}
                                onChange={e => {
                                    setSelectedCharacterId(e.target.value);
                                    setAddStatus(null);
                                }}
                                required
                                disabled={addStatus === 'loading'}
                            >
                                <option value="">Select a character</option>

                                {availableCharacters.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}

                            </select>

                            <button
                                type="submit"
                                disabled={!selectedCharacterId || addStatus === 'loading'}
                                className={styles.btnAdd}
                            >
                                {addStatus === 'loading' ? 'Adding...' : "Add"}
                            </button>

                        {addStatus === 'success' && (
                            <p className={styles.feedbackSuccess}>Character added to scene.</p>
                        )}
                        {addStatus === 'error' && (
                            <p className={styles.feedbackError}>Erro adding this character to this scene</p>
                        )}

                    </form>

                )}

                <button
                    onClick={handleDeleteScene}
                    className={styles.btnDelete}
                >
                    Delete scene
                </button>

            </div>
        </div>
    );
}

export default SceneDetails;