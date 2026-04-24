import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const styles = {
    container: "p-8 bg-slate-900 min-h-screen text-white flex flex-col items-center",
    card: "bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl w-full max-w-lg",
    title: "text-3xl font-bold text-blue-400 mb-6 text-center",
    label: "block text-sm font-medium text-slate-400 mb-1",
    input: "w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all",
    textArea: "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors mb-6 h-32 resize-none",
    btnSubmit: "w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50",
    btnCancel: "mt-4 text-slate-500 hover:text-slate-300 transition-colors w-full text-center"
}

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
        setError(null);

        try {
            await api.post('/scenes', { name, description });
            navigate('/');
        } catch (err) {
            setError("Server connection error.", err);
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
                        placeholder="Description exemple."
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