// pages/Characters.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import styles from '../styles/globalStyles';

function Characters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 9;
    const navigate = useNavigate();

    const fetchCharacters = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/characters');
            setCharacters(res.data);
        } catch (err) {
            console.error("Error loading characters.", err);
            setError("Error loading characters.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const fetchData = async() => {
            await fetchCharacters();
        }

        fetchData();
        
    }, []);

    const handleDelete = async (characterId) => {
        if (!window.confirm("Do you really want to delete this character?")) return;
        try {
            await api.delete(`/characters/${characterId}`);
            fetchCharacters();
        } catch (err) {
            console.error("Error deleting character.", err);
            setError("Error deleting character.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 p-10">{error}</div>;

    const totalPages = Math.ceil(characters.length / LIMIT);
    const paginated = characters.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Characters:</h1>
                <button
                    onClick={() => navigate('/characters/new')}
                    className={styles.btnCreate}
                >
                    + New character
                </button>
            </header>

            {paginated.length === 0 ? (
                <p className={styles.emptyMessage}>No characters registered yet.</p>
            ) : (
                <main className={styles.grid}>
                    {paginated.map(character => (
                        <div key={character.id} className={styles.card}>
                            <h3 className={styles.characterName}>{character.name}</h3>
                            <p className={styles.prompt}>{character.personalityPrompt}</p>
                            <button
                                onClick={() => handleDelete(character.id)}
                                className={styles.btnDelete}
                            >
                                Delete character
                            </button>
                        </div>
                    ))}
                </main>
            )}

            {totalPages > 1 && (
                <footer className={styles.footer}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`${styles.btnBase} ${styles.btnNav}`}
                    >
                        ← Previous
                    </button>

                    <span className="text-slate-400 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`${styles.btnBase} ${styles.btnNav}`}
                    >
                        Next →
                    </button>
                </footer>
            )}
        </div>
    );
}

export default Characters;