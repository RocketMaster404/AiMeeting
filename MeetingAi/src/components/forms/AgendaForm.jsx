import { useState } from "react";
import styles from "./Forms.module.css";
import sendArrow from "../../icons/sendArrow.svg";
import { createAgenda } from "../../api/prompts";
import AgendaResult from "../results/AgendaResult";

function AgendaForm() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [agenda, setAgenda] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalMinutes = Number(hours || 0) * 60 + Number(minutes || 0);

    function buildPrompt() {
        const parts = [];
        if (title) parts.push(`Titel: ${title}`);
        if (date) parts.push(`Datum: ${date}`);
        if (totalMinutes > 0) parts.push(`Längd: ${totalMinutes} minuter`);
        if (agenda) parts.push(`Agenda: ${agenda}`);
        return parts.join("\n");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const userPrompt = buildPrompt();
        if (!userPrompt) {
            setError("Fyll i minst ett fält.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await createAgenda(userPrompt);
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
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <label htmlFor="hours">Duration</label>
                <div className={styles.durationRow}>
                    <div className={styles.durationField}>
                        <input
                            id="hours"
                            type="number"
                            min="0"
                            max="24"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="0"
                            aria-label="Hours"
                        />
                        <span className={styles.unit}>h</span>
                    </div>
                    <div className={styles.durationField}>
                        <input
                            id="minutes"
                            type="number"
                            min="0"
                            max="59"
                            step="5"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            placeholder="30"
                            aria-label="Minutes"
                        />
                        <span className={styles.unit}>min</span>
                    </div>
                </div>

                <label htmlFor="agenda">Agenda</label>
                <textarea
                    id="agenda"
                    placeholder="add text..."
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                />

                <button
                    className={styles.submitBtn}
                    type="submit"
                    aria-label="Send"
                    disabled={loading}
                >
                    <img src={sendArrow} alt="" />
                </button>
            </form>

            {error && <p>{error}</p>}

            <AgendaResult data={result} onClose={() => setResult(null)} />
        </div>
    );
}

export default AgendaForm;
