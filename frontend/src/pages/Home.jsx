import { useState } from 'react';
import { Link } from 'react-router-dom';
import SceneCard from '../components/SceneCard';
import Loading from '../components/Loading';
import useFetchScenes from '../hooks/useFetchScenes';    //integracao com a API vem daqui

const styles = {
    container: "p-8 bg-slate-900 min-h-screen text-white", 
    grid: "grid grid-cols-1 md:grid-cols-3 gap-6",      //interface responsiva: se a tela for pequena, mostra cenas 1 embaixo da outra, se for grande, mostra em 3 colunas
    header: "flex justify-between items-center mb-8",
    title: "text-3xl font-bold text-blue-400",
    btnBase: "px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95",
    btnCreate: "bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-all",
    btnNav: "bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed",
    footer: "mt-12 flex justify-center items-center gap-4"
};

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
                <Link to="/scenes/new" className={styles.btnCreate}>
                    + New scene
                </Link>
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
                    className={styles.btnNav}
                >
                    Next →
                </button>

            </footer>

        </div>
    )
}

export default Home;

/* const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);      //p/ paginacao
    const [error, setError] = useState(null);

    const LIMIT = 9;
    const nextPage = () => setCurrentPage(p => p + 1);
    const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1)); 
    
    
useEffect(() => {
        const fetchScenes = async () => {
            try {
                setLoading(true);
                const res = await api.get('/scenes', { params: { page: currentPage, limit: LIMIT } })
                console.log("Server's answer:", res.data);
                setScenes(res.data.scenes || []);

            } catch (err) {
                console.error("Error in fetching scenes.", err);
                setError("'Scenes' could not be loaded.");

            } finally {
                setLoading(false);      //vai parar de carregar se der certo ou se der erro
            }
        };

        fetchScenes();

    }, [currentPage]);*/