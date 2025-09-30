import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";
import "./Dashboard.css";

export default function Dashboard() {
  const studentName = "Al Amine Human Capital";
  const navigate = useNavigate();

  const modules = [
    { name: "Jour 1", path: "/jour1", img: "/image/jour1.jpeg", description: "Introduction à la GED" },
    { name: "Jour 2", path: "/jour2", img: "/image/jour2.jpeg", description: "Organisation des documents" },
    { name: "Jour 3", path: "/jour3", img: "/image/jour3.jpeg", description: "GED avancée et bonnes pratiques" },
  ];

  // Charger la progression sauvegardée (si existe)
  const [consultedModules, setConsultedModules] = useState(() => {
    const saved = localStorage.getItem("consultedModules");
    return saved ? JSON.parse(saved) : [];
  });

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem("consultedModules", JSON.stringify(consultedModules));
  }, [consultedModules]);

  // Calcul progression
  const progress = Math.round((consultedModules.length / modules.length) * 100);

  // Quand un module est consulté
  const handleModuleClick = (path, name) => {
    if (!consultedModules.includes(name)) {
      setConsultedModules([...consultedModules, name]);
    }
    navigate(path);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src="/image/al.png" alt="Logo Al Amine" className="logo-img" />

        <div className="sidebar-profile">
          <h2>Tableau de bord</h2>
          <h4>{studentName}</h4>
          <p>Statut : Débutant</p>

          <div className="progress-bar-sidebar">
            <div
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #ffffffff, #b92119)",
                height: "10px",
                borderRadius: "5px",
              }}
            ></div>
          </div>
          <p>{progress}% des modules complétés</p>
        </div>

        {/* Bouton changer mot de passe */}
        <div className="sidebar-change-password">
          <button onClick={() => navigate("/change-password")}>Changer mon mot de passe</button>
        </div>

        {/* Astuce / citation */}
        <div className="sidebar-quote">
          <h4>Astuce du jour</h4>
          <p>Organisez vos documents par thème pour progresser plus vite !</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <div className="scrolling-welcome">
            <span>Bienvenue, {studentName}</span>
          </div>
        </header>

        <section className="progress-section">
          <h2>Votre progression</h2>
          <Progress progress={progress} />
        </section>

        <section className="modules-section">
          <h2>Vos modules</h2>
          <div className="modules-container">
            {modules.map((mod, index) => (
              <div key={index} className="module-card">
                <img src={mod.img} alt={mod.name} className="module-image" />
                <h3>{mod.name}</h3>
                <p>{mod.description}</p>
                <button
                  className="module-button"
                  onClick={() => handleModuleClick(mod.path, mod.name)}
                >
                  Accéder
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
