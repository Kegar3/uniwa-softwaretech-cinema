import { useEffect, useState } from "react";
import "./AdminPanel.css"; // styling

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", duration: "", release_date: "" });
  const [newShowtime, setNewShowtime] = useState({ movie_id: "", hall: "", start_time: "" });
  const [posterFile, setPosterFile] = useState(null); // Add state for poster file
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCurrentUser();
    fetchMovies();
    fetchShowtimes();
    fetchReservations();
    fetchUsers();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setCurrentUser(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchMovies = async () => {
    const res = await fetch("http://localhost:3000/movies", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setMovies(data);
  };

  const fetchShowtimes = async () => {
    try {
      const res = await fetch("http://localhost:3000/showtimes", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();

      setShowtimes(data.showtimes || []); // Αν το API επιστρέφει { showtimes: [...] }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      setShowtimes([]); // Αν υπάρχει σφάλμα, επιστρέφει κενή λίστα
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3000/reservations", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();

      setReservations(data.reservations || []); // Αν το API επιστρέφει { reservations: [...] }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleAddMovie = async () => {
    const formData = new FormData();
    formData.append("title", newMovie.title);
    formData.append("genre", newMovie.genre);
    formData.append("duration", newMovie.duration);
    formData.append("release_date", newMovie.release_date);
    if (posterFile) {
      formData.append("poster", posterFile); // Append the poster file
    }

    const res = await fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    if (res.ok) fetchMovies();
  };

  const handleDeleteMovie = async (id) => {
    const res = await fetch(`http://localhost:3000/movies/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      fetchMovies();
      fetchShowtimes();
      fetchReservations();
    }
  };

  const handleAddShowtime = async () => {
    const res = await fetch("http://localhost:3000/showtimes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newShowtime)
    });
    if (res.ok) fetchShowtimes();
  };

  const handleDeleteShowtime = async (id) => {
    const res = await fetch(`http://localhost:3000/showtimes/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      fetchShowtimes();
      fetchReservations();
    }
  };

  const handleDeleteReservation = async (id) => {
    const res = await fetch(`http://localhost:3000/reservations/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) fetchReservations();
  };

  const handleDeleteUser = async (id) => {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) fetchUsers();
  };

  const handleUpdateUserRole = async (id, role) => {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });
    if (res.ok) fetchUsers();
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>

      <section className="admin-section">
        <h3>Manage Movies</h3>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setNewMovie({ ...newMovie, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Genre"
          onChange={(e) =>
            setNewMovie({ ...newMovie, genre: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Duration"
          onChange={(e) =>
            setNewMovie({ ...newMovie, duration: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Release Date"
          onChange={(e) =>
            setNewMovie({ ...newMovie, release_date: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPosterFile(e.target.files[0])} // Handle file input
        />
        <button onClick={handleAddMovie}>Add Movie</button>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.genre}) <b>ID:</b> {movie.id}
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section">
        <h3>Manage Showtimes</h3>
        <div className="form-group">
          <select
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, movie_id: e.target.value })
            }
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title} (ID: {movie.id})
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, hall: e.target.value })
            }
          >
            <option value="">Select Hall</option>
            <option value="1">Hall 1</option>
            <option value="2">Hall 2</option>
          </select>
          <input
            type="datetime-local"
            placeholder="Start Time"
            onChange={(e) =>
              setNewShowtime({ ...newShowtime, start_time: e.target.value })
            }
          />
          <button onClick={handleAddShowtime}>Add Showtime</button>
        </div>
        <ul>
          {showtimes.map((showtime) => (
            <li key={showtime.id}>
              <b>Showtime ID:</b> {showtime.id} | Movie ID:{" "}
              {showtime.movie_id} | Hall: {showtime.hall} | Time:{" "}
              {new Date(showtime.start_time).toLocaleString()}
              <button onClick={() => handleDeleteShowtime(showtime.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section">
        <h3>Manage Reservations</h3>
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              Movie: {res.Showtime.Movie.title} | Showtime:{" "}
              {new Date(res.Showtime.start_time).toLocaleString()} | Seat:{" "}
              {res.seat}
              <button onClick={() => handleDeleteReservation(res.id)}>
                Cancel Reservation
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section">
        <h3>Manage Users</h3>
        <ul>
          {users
            .filter((user) => currentUser && user.id !== currentUser.id) // Exclude the current user
            .map((user) => (
              <li key={user.id}>
                <b>ID:</b> {user.id} {user.username} ({user.email}){" "}
                <b>Role:</b> {user.role}
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleUpdateUserRole(
                      user.id,
                      user.role === "admin" ? "user" : "admin"
                    )
                  }
                >
                  {user.role === "admin"
                    ? "Demote to User"
                    : "Promote to Admin"}
                </button>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;