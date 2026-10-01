import styles from "./Results.module.css";

function AgendaResult({ data, onClose }) {
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
                    <h2>{data.date}</h2>
                    <h3>Duration: {data.duration}</h3>
                </div>

                {data.text && (
                    <div className={styles.introTextContainer}>
                        <p>{data.text}</p>
                    </div>
                )}

                <div className={styles.agendaPointsContainer}>
                    <ul>
                        {data.agendaPoints?.map((p, index) => (
                            <li key={index}>{p}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AgendaResult;