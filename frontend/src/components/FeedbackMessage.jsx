import styles from '../styles/globalStyles';

function FeedbackMessage({ error, success }) {
    if (!error && !success) return null;
    return (
        <>
            {error && <p className={styles.feedbackError}>{error}</p>}
            {success && <p className={styles.feedbackSuccess}>{success}</p>}
        </>
    );
}

export default FeedbackMessage;