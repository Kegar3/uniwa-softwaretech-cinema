import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminPanel from "./AdminPanel";

const AdminPage = () => {
    const [view, setView] = useState("dashboard"); // Default view is "dashboard"

    return (
        <div>
            <h2>Admin Page</h2>
            <div style={styles.nav}>
                <button onClick={() => setView("dashboard")} style={view === "dashboard" ? styles.activeButton : styles.button}>
                    Dashboard
                </button>
                <button onClick={() => setView("panel")} style={view === "panel" ? styles.activeButton : styles.button}>
                    Panel
                </button>
            </div>
            <div style={styles.content}>
                {view === "dashboard" && <AdminDashboard />}
                {view === "panel" && <AdminPanel />}
            </div>
        </div>
    );
};

const styles = {
    nav: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
    },
    button: {
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "gray",
        color: "white",
        border: "none",
        borderRadius: "5px"
    },
    activeButton: {
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "5px"
    },
    content: {
        marginTop: "20px"
    }
};

export default AdminPage;