import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import ProgressBar from "../components/ProgressBar.js";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

export default function Dashboard() {
  const studentName = "Al Amine Human Capital";
  const navigate = useNavigate();

  const modules = [
    {
      name: "Jour 1",
      path: "/jour1",
      img: "/image/jour1.jpeg",
      description: "Introduction à la GED",
    },
    {
      name: "Jour 2",
      path: "/jour2",
      img: "/image/jour2.jpeg",
      description: "Organisation des documents",
    },
    {
      name: "Jour 3",
      path: "/jour3",
      img: "/image/jour3.jpeg",
      description: "GED avancée et bonnes pratiques",
    },
  ];

  const [completedModules, setCompletedModules] = useState(() => {
    const saved = localStorage.getItem("completedModules");
    return saved ? JSON.parse(saved) : [];
  });

  const progressPercent = Math.round(
    (completedModules.length / modules.length) * 100
  );

  useEffect(() => {
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
  }, [completedModules]);

  const handleModuleClick = (mod) => {
    if (!completedModules.includes(mod.name)) {
      setCompletedModules([...completedModules, mod.name]);
    }
    navigate(mod.path);
  };

  // Sidebar interactif
  const [openSections, setOpenSections] = useState({
    ebooks: false,
  });

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  // État pour le calendrier
  const [date, setDate] = useState(new Date());

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-body">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="sidebar">
          {/* Profil + ProgressBar */}
          <div className="sidebar-profile">
            <h2>Tableau de bord</h2>
            <h4>{studentName}</h4>
            <p>Statut : Apprenant</p>
            <ProgressBar progress={progressPercent} />
          </div>

          {/* ---------------- Mini-calendrier VISIBLE ---------------- */}
          <div className="sidebar-section">
            <div className="sidebar-content">
              <Calendar
                onChange={setDate}
                value={date}
                minDetail="month"
                maxDetail="month"
              />
              <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>
                Date sélectionnée : {date.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Section Ebooks */}
          <div className="sidebar-section">
            <button
              className="sidebar-button"
              onClick={() => toggleSection("ebooks")}
            >
              <FaBook className="icon" /> Ebooks
              {openSections.ebooks ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openSections.ebooks && (
              <div className="sidebar-content">
                <ul>
                  <li>Guide GED 2025.pdf</li>
                  <li>Archivage probatoire.pdf</li>
                  <li>Indexation intelligente.pdf</li>
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* ---------------- CONTENU PRINCIPAL ---------------- */}
        <div className="main-content">
          <section className="progress-section">
            <h2>Objectif global</h2>
            <p>
              Ce séminaire formation a pour objectif de permettre aux
              participants de passer d'une GED classique limitée à une GED
              intelligente et automatisée, intégrant l’IA et l’archivage
              probatoire pour améliorer la performance, la conformité et la
              valeur stratégique de la gestion documentaire.
            </p>
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
                    onClick={() => handleModuleClick(mod)}
                  >
                    Accéder
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
