import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import pour la navigation
import "./Login.css";

const images = [
  {
    src: `${process.env.PUBLIC_URL}/image/apprenant-cncntr.jpg`,
    text: "Nous avons pensé nos parcours pour être simples et accessibles à tous. Que vous soyez débutant ou déjà expérimenté, chaque module est conçu pour vous guider clairement et vous permettre de progresser sans difficulté.",
  },
  {
    src: `${process.env.PUBLIC_URL}/image/time.jpeg`,
    text: "Chaque minute compte. Avec des contenus clairs et bien structurés, vous développez vos compétences efficacement",
  },
  {
    src: `${process.env.PUBLIC_URL}/image/Ged.jpg`,
    text: "Grâce à notre expertise en GED, nous transformons la gestion documentaire en un vrai moteur d’apprentissage. Vos ressources sont organisées, sécurisées et toujours disponibles.",
  },
];

export default function Login() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // ✅ Hook pour rediriger

  // Changement automatique des slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fonction déclenchée au clic sur "Se connecter"
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // 👉 redirige vers la page Dashboard étudiant
  };

  return (
    <div className="login-container">
      {/* Partie gauche */}
      <div className="left-panel">
        <div className="site-title">
          <h1>Alamine Groupe</h1>
          <p>Learning Plateforme</p>
        </div>
        <div
          className="slide"
          style={{ backgroundImage: `url(${images[current].src})` }}
        >
          <div className="overlay">
            <h2>{images[current].text}</h2>
          </div>
        </div>
      </div>

      {/* Partie droite */}
      <div className="right-panel">
        <div className="form-box">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mot de passe</label>
              <div className="input-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Se souvenir de moi
              </label>
              <a href="/forgot-password" className="forgot-link">
                Mot de passe oublié ?
              </a>
            </div>

            <button type="submit" className="btn-login">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}