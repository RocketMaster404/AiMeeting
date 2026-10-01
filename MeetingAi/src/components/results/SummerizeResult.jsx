import styles from "./Results.module.css";

function SummarizeResult({ data, onClose }) {
    if (!data) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Stäng">
                    ×
                </button>

                <div className={styles.headlineContainer}>
                    <h1>{data.title}</h1>
                </div>

                {data.participants?.length > 0 && (
                    <div className={styles.participantsContainer}>
                        <h3>Deltagare</h3>
                        <ul>
                            {data.participants.map((p, index) => (
                                <li key={index}>{p}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={styles.introTextContainer}>
                    <p>{data.summerize}</p>
                </div>
            </div>
        </div>
    );
}

export default SummarizeResult;