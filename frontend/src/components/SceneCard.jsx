import { Link } from 'react-router-dom';

const styles = {
    card: "p-6 bg-slate-800 border border-slate-700 rounded-xl shadow-lg hover:border-blue-500 transition-all",
    title: "text-xl font-bold text-blue-400 mb-2",
    description: "text-slate-400 line-clamp-2",     //"line-clamp-2" de <p></p> corta a descricao em 2 linhas e adiciona ... se for muito grande//
    btn: "bg-blue-600 hover:bg-blue-500 text-white w-full text-center block mt-4 py-2 rounded-lg font-semibold"
};

function SceneCard({ scene }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{scene.name}</h3>
            <p className={styles.description}>{scene.description}</p>
            <Link to={`/scenes/${scene.id}`} className={styles.btn}>Details</Link>
        </div>
    );
}

export default SceneCard;