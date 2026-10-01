import React from "react";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.boxContainer}>
                <div className={styles.textContainer}>
                    <h1>Welcome!</h1>
                    <h2>
                        This tool helps you create meeting agendas, generate
                        invitations, and summarize your meeting notes with ease
                    </h2>
                    <h3>
                        Save time here and let your team invest their focus
                        where it makes the biggest difference
                    </h3>
                </div>

                <div className={styles.startContainer}>
                    <h2>Start here</h2>
                </div>
                <div
                    className={styles.navContainer}
                    onClick={() => navigate("/invite")}
                >
                    <h2>Create invitation</h2>
                </div>
                <div
                    className={styles.navContainer}
                    onClick={() => navigate("/agenda")}
                >
                    <h2>Create Agenda</h2>
                </div>
                <div
                    className={styles.navContainer}
                    onClick={() => navigate("/sum")}
                >
                    <h2>Sum up your meeting</h2>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
