import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminPanel from "./AdminPanel";
import "./AdminPage.css"; // Import the CSS file for styling

const AdminPage = () => {
  const [view, setView] = useState("dashboard"); // Default view is "dashboard"

  return (
    <div className="admin-page-container">
      <h2>Admin Page</h2>
      <div className="nav">
        <button
          onClick={() => setView("dashboard")}
          className={view === "dashboard" ? "active-button" : "button"}
        >
          Dashboard
        </button>
        <button
          onClick={() => setView("panel")}
          className={view === "panel" ? "active-button" : "button"}
        >
          Panel
        </button>
      </div>
      <div className="content">
        {view === "dashboard" && <AdminDashboard />}
        {view === "panel" && <AdminPanel />}
      </div>
    </div>
  );
};

export default AdminPage;