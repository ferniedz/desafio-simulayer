import { useState } from 'react';
import { Link } from 'react-router-dom';
import SceneCard from '../components/SceneCard';
import Loading from '../components/Loading';
import useFetchScenes from '../hooks/useFetchScenes';    //integracao com a API vem daqui
import styles from '../styles/globalStyles';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const LIMIT = 9;
    const { scenes, loading, error } = useFetchScenes(currentPage, LIMIT);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 p-10">{error}</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Scenes:</h1>
                <div className="flex flex-col gap-2">
                    <Link to="/scenes/new" className={styles.btnCreate}>
                        + New scene
                    </Link>

                    <Link to="/characters/new" className={styles.btnCreate}>
                        + New character
                    </Link>

                    <Link to="/characters" className={styles.btnDelete}>
                        Delete character from database
                    </Link>

                </div>
            </header>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <main className={styles.grid}>
                {scenes.map((scene) => (
                    <SceneCard key={scene.id} scene={scene}/>
                ))}
            </main>

            <footer className={styles.footer}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}        //pagina atual = verdadeiro
                    className={`${styles.btnBase} ${styles.btnNav}`}>
                    ← Previous
                </button>

                <span className="text-slate-400 font-medium">
                    Page {currentPage}
                </span>

                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={scenes.length < LIMIT}
                    className={`${styles.btnBase} ${styles.btnNav}`}
                >
                    Next →
                </button>

            </footer>

        </div>
    )
}

export default Home;