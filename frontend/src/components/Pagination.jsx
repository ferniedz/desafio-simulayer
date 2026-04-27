import styles from '../styles/globalStyles';

function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    if (totalPages <= 1) return null;
    return (
        <footer className={styles.footer}>
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`${styles.btnBase} ${styles.btnNav}`}
            >
                ← Previous
            </button>
            <span className="text-slate-400 font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`${styles.btnBase} ${styles.btnNav}`}
            >
                Next →
            </button>
        </footer>
    );
}

export default Pagination;