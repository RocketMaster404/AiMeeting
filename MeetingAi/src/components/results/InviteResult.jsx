import { useState } from "react";
import styles from "./Results.module.css";

function InviteResult({ data, onClose }) {
    const [copied, setCopied] = useState(false);

    if (!data) {
        return null;
    }

    async function handleCopy() {
        const fullText = `${data.title}\n${data.date} · ${data.duration}\n\n${data.text}`;
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

                <div className={styles.introTextContainer}>
                    <p>{data.text}</p>
                </div>

                <button className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? "Kopierad ✓" : "Kopiera inbjudan"}
                </button>
            </div>
        </div>
    );
}

export default InviteResult;