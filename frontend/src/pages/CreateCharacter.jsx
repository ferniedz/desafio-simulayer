import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import FeedbackMessage from '../components/FeedbackMessage';
import styles from '../styles/globalStyles';

function CreateCharacter() {
    const [name, setName] = useState('');
    const [personalityPrompt, setPersonalityPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);     //para evitar permanencia de resposta na tela
        setSuccess(null);

        if (!name.trim() || !personalityPrompt.trim()) {
            setError("'Name' and 'personality prompt' fields are required.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/characters', {
                name,
                personalityPrompt
            });
            setSuccess("Character crated.");
            setName('');
            setPersonalityPrompt('');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError("Server connection error.", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Create new character</h1>

                <FeedbackMessage error={error} success={success} />

                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        placeholder="Name exemple"
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                            setError(null);
                        }}
                        disabled={loading}
                    />

                    <label className={styles.label}>Personality prompt</label>
                    <textarea
                        className={styles.textArea}
                        placeholder="Personality prompt exemple"
                        value={personalityPrompt}
                        onChange={e => {
                            setPersonalityPrompt(e.target.value);
                            setError(null);
                        }}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={loading || success}
                    >
                        {loading ? 'Creating character...' : 'Create character'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className={styles.btnCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCharacter;