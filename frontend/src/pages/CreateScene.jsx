import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../styles/globalStyles';

function CreateScene() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            setError("'Name' and 'description' fields are required.");
            return;
        }

        setLoading(true);

        try {
            await api.post('/scenes', { name, description });
            navigate('/');
        } catch (err) {
            setError("Error server connection.", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>New scene</h1>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Scene name</label>
                    <input 
                        className={styles.input}
                        placeholder="Name exemple"
                        value={name}
                        onChange={(e) => setName(e.target.value) }
                        disabled={loading}
                    />

                    <label className={styles.label}>Description</label>
                    <textarea 
                        className={styles.textArea}
                        placeholder="Description exemple"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={loading}
                    >

                        {loading ? 'Creating scene...' : 'Create scene'}

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
    )
}

export default CreateScene;