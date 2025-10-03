import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Module CSS
import API from "../api"; // axios configuré avec withCredentials: true

export default function Login() {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(""); // Affichage des erreurs
  const [loading, setLoading] = useState(false); // Pour désactiver le bouton
  const navigate = useNavigate();

  const images = [
    {
      src: `${process.env.PUBLIC_URL}/image/apprenant-cncntr.jpg`,
      text: "Nous avons pensé nos parcours pour être simples et accessibles à tous...",
    },
    {
      src: `${process.env.PUBLIC_URL}/image/time.jpeg`,
      text: "Chaque minute compte. Avec des contenus clairs et bien structurés...",
    },
    {
      src: `${process.env.PUBLIC_URL}/image/Ged.jpg`,
      text: "Grâce à notre expertise en GED, nous transformons la gestion documentaire...",
    },
  ];

  // Slider automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fonction de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      // 1️⃣ Récupération CSRF cookie pour Sanctum
      await API.get("/sanctum/csrf-cookie");

      // 2️⃣ Requête de login
      const res = await API.post("/api/login", { email, password });

      // 3️⃣ Sauvegarde du token et redirection
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErr(
        error.response?.data?.message || "Email ou mot de passe incorrect"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      {/* Partie gauche : slider */}
      <div className={styles["left-panel"]}>
        <div className={styles["site-title"]}>
          <h1>Alamine Groupe</h1>
          <p>Learning Plateforme</p>
        </div>
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${images[current].src})` }}
        >
          <div className={styles.overlay}>
            <h2>{images[current].text}</h2>
          </div>
        </div>
      </div>

      {/* Partie droite : formulaire */}
      <div className={styles["right-panel"]}>
        <div className={styles["form-box"]}>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
              <label>Email</label>
              <div className={styles["input-icon"]}>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles["input-group"]}>
              <label>Mot de passe</label>
              <div className={styles["input-icon"]}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.options}>
              <label>
                <input type="checkbox" /> Se souvenir de moi
              </label>
              <a href="/forgot-password" className={styles["forgot-link"]}>
                Mot de passe oublié ?
              </a>
            </div>

            {/* Affichage des erreurs */}
            {err && <p style={{ color: "red", marginTop: "10px" }}>{err}</p>}

            <button
              type="submit"
              className={styles["btn-login"]}
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
