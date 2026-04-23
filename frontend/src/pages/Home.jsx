import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const styles = {
    container: "p-8 bg-slate-900 min-h-screen text-white", 
    grid: "grid grid-cols-1 md:grid-cols-3 gap-6",      //interface responsiva: se a tela for pequena, mostra cenas 1 embaixo da outra, se for grande, mostra em 3 colunas
    card: "p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-lg hover:border-blue-500 transition-all",
    btnBase: "px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95",
    btnPrimary: "bg-blue-600 hover:bg-blue-500 text-white w-full text-center block mt-4",
    btnNav: "bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed",
    footer: "mt-12 flex justify-center items-center gap-4"
};

function Home() {
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);      //p/ paginacao
    const [error, setError] = useState(null);

    const LIMIT = 10;
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

    }, [currentPage]);

    if (loading) return <div className="text-white p-10">Loading scenes...</div>
    if (error) return <div className="text-red-500 p-10">{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className="text-3xl font-bold mb-8">Scenes:</h1>
            <div className={styles.grid}>
                {scenes.map((scene) => (    //"line-clamp-2" de <p></p> corta a descricao em 2 linhas e adiciona ... se for muito grande//
                    <div key={scene.id} className={styles.card}>
                        <h2 className="text-xl font-bold text-blue-400 mb-2">{scene.name}</h2>
                        <p className="text-slate-400 text-sm line-clamp-2">{scene.description}</p>
                    <Link to={`/scenes/${scene.id}`} className={`${styles.btnBase} ${styles.btnPrimary}`}>
                            Details
                    </Link>
                    </div>
                ))}
                </div>
            <footer className={styles.footer}>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}        //pagina atual = verdadeiro
                    className={`%{styles.btnBase} ${styles.btnNav}`}>
                    ← Previous
                </button>
                <span className="text-slate-400 font-medium">
                    Page {currentPage}
                </span>
                <button
                    onClick={nextPage}
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