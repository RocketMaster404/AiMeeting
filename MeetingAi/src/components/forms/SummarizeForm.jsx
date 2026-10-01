import { useState } from "react";
import styles from "./Forms.module.css";
import sendArrow from "../../icons/sendArrow.svg";
import SummarizeResult from "../results/SummerizeResult";
import { createSummary } from "../../api/prompts";

function SummarizeForm() {
    const [notes, setNotes] = useState("");

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!notes.trim()) {
            setError("Skriv in några anteckningar först.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await createSummary(notes);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="notes">Meeting notes</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="insert notes here...."
                />
                <button
                    className={styles.submitBtn}
                    type="submit"
                    disabled={loading}
                >
                    <img src={sendArrow} alt="submit" />
                </button>
            </form>

            {error && <p>{error}</p>}

            <SummarizeResult data={result} onClose={() => setResult(null)} />
        </div>
    );
}

export default SummarizeForm;
