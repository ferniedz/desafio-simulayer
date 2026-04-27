// pages/Characters.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import FeedbackMessage from '../components/FeedbackMessage';
import useFetchCharacters from '../hooks/useFetchCharacters';
import styles from '../styles/globalStyles';

function Characters() {
    const { characters, loading, error, refresh } = useFetchCharacters();
    const [deleteError, setDeleteError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 9;
    const navigate = useNavigate();

    const handleDelete = async (characterId) => {
        if (!window.confirm("Do you really want to delete this character?")) return;
        try {
            await api.delete(`/characters/${characterId}`);
            refresh();
        } catch (err) {
            console.error("Error deleting character.", err);
            setDeleteError("Error deleting character.");
        }
    };

    if (loading) return <Loading />;

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

            <FeedbackMessage error={error || deleteError} />

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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
                onNext={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            />

        </div>
    );
}

export default Characters;