import { Link } from 'react-router-dom';
import styles from '../styles/globalStyles';

function SceneCard({ scene }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{scene.name}</h3>
            <p className={styles.description}>{scene.description}</p>
            <Link to={`/scenes/${scene.id}`} className={`${styles.btnBase} ${styles.btnCreate}`}>Details</Link>
        </div>
    );
}

export default SceneCard;