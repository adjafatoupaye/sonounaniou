import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js"; // Header importé
import { FaBook, FaBullseye, FaCalendarAlt, FaHome } from "react-icons/fa";
import "./Jour.css";

export default function Jour1() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [openContent, setOpenContent] = useState({}); // pour supports, vidéo, quiz

  const userName = localStorage.getItem("userName") || "Utilisateur";

  // Quiz
  const questions = [
    {
      question: "Quelle est la capitale du Sénégal ?",
      options: ["Dakar", "Paris", "Lagos"],
      answer: "Dakar",
    },
    {
      question: "Combien y a-t-il de continents ?",
      options: ["5", "6", "7"],
      answer: "7",
    },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Supports PDF + description
  const supports = [
    {
      title:
        "Séquence 1 : Preparer la transformation vers une GED intelligente",
      file: "/cours/2-Preparer-la-transformation-vers-une-GED-intelligente.pptx.pdf",
      description:
        "Ce module traite des bases de la GED (Gestion Électronique des Documents), ses principes fondamentaux et des cas pratiques pour mieux comprendre son utilisation en entreprise.",
    },
    {
      title: "Séquence 2 : Préparer et piloter la transformation Digitale",
      file: "/cours/3-Atelier_Diagnostic_Interactif_SENELEC (a mettre en forme).pptx.pdf",
      description:
        "Ce module approfondit la GED intelligente, en explorant les outils avancés et les techniques d’automatisation pour améliorer la productivité et la gestion documentaire.",
    },
    {
      title: "Séquence 3 : Présentation de DocuWare",
      file: "/cours/4-2024 Présentation de l´entreprise DocuWare FR (9).pptx.pdf",
      description:
        "Ce module traite des bases de la GED (Gestion Électronique des Documents), ses principes fondamentaux et des cas pratiques pour mieux comprendre son utilisation en entreprise.",
    },
    {
      title: "Séquence 4 : Présentation de Alamine Groupe",
      file: "/cours/5-AL Amine Groupe Juillet 2025.pptx.pdf",
      description:
        "Ce module approfondit la GED intelligente, en explorant les outils avancés et les techniques d’automatisation pour améliorer la productivité et la gestion documentaire.",
    },
    {
      title: "Séquence 5 : Docuware IDP présentation",
      file: "/cours/6-DocuWare IDP Presentation.pptx.pdf",
      description:
        "Ce module traite des bases de la GED (Gestion Électronique des Documents), ses principes fondamentaux et des cas pratiques pour mieux comprendre son utilisation en entreprise.",
    },
  ];

  const sessions = [
    { time: "09h00 - 09h15", title: "Accueil" },
    { time: "09h15 - 09h30", title: "Mot de bienvenue" },
    { time: "09h30 - 09h45", title: "Préparer la transformation" },
  ];

  const toggleContent = (key) => {
    setOpenContent({ ...openContent, [key]: !openContent[key] });
  };

  return (
    <>
      <Header userName={userName} />

      <div className="jour-layout">
        <aside className="sidebar">
          <h2>Informations</h2>

          {/* ----- BOUTON DASHBOARD ----- */}
          <button
            className="sidebar-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome className="icon" /> Dashboard
          </button>

          <div className="accordion">
            {/* Description */}
            <div>
              <button
                onClick={() =>
                  setOpenSection(openSection === "desc" ? null : "desc")
                }
              >
                <FaBook className="icon" /> Description
              </button>
              {openSection === "desc" && (
                <div className="accordion-content">
                  <p>
                    Ce module introduit les bases de la GED et ses applications
                    professionnelles.
                  </p>
                </div>
              )}
            </div>

            {/* Objectifs */}
            <div>
              <button
                onClick={() =>
                  setOpenSection(openSection === "obj" ? null : "obj")
                }
              >
                <FaBullseye className="icon" /> Objectifs
              </button>
              {openSection === "obj" && (
                <div className="accordion-content">
                  <ul>
                    <li>Comprendre la GED intelligente</li>
                    <li>Découvrir les cas d’usage</li>
                    <li>Pratiquer sur un cas réel</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Emploi du temps */}
            <div>
              <button
                onClick={() =>
                  setOpenSection(openSection === "emploi" ? null : "emploi")
                }
              >
                <FaCalendarAlt className="icon" /> Programme
              </button>
              {openSection === "emploi" && (
                <div className="accordion-content">
                  <ul>
                    {sessions.map((s, i) => (
                      <li key={i}>
                        <strong>{s.time}</strong> : {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="content">
          <div className="scrolling-container">
            <span className="scrolling-text">contenu du module</span>
          </div>

          {/* Supports en 2 colonnes */}
          <h2>Supports</h2>
          <div className="supports-container">
            {supports.map((s, i) => (
              <div key={i} className="card">
                <h3>{s.title}</h3>
                <div className="btn-group">
                  <a
                    href={s.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Ouvrir le support
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Vidéo */}
          <section>
            <h2>Vidéos</h2>
            <div className="card">
              <button className="btn" onClick={() => toggleContent("video")}>
                {openContent["video"]
                  ? "▲ Masquer la vidéo"
                  : "▼ Déplier la vidéo"}
              </button>
              {openContent["video"] && (
                <iframe
                  width="100%"
                  height="360"
                  src="https://www.youtube.com/embed/VIHc0a9S_Yk"
                  title="Vidéo explicative"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="preview-frame"
                ></iframe>
              )}
            </div>
          </section>

          {/* Quiz */}
          <section>
            <h2>Quiz interactif</h2>
            <div className="card">
              <button className="btn" onClick={() => toggleContent("quiz")}>
                {openContent["quiz"]
                  ? "▲ Masquer le quiz"
                  : "▼ Déplier le quiz"}
              </button>
              {openContent["quiz"] &&
                questions.map((q, index) => (
                  <div key={index} className="quiz-card">
                    <p>{q.question}</p>
                    {q.options.map((opt, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name={`q${index}`}
                          onChange={() =>
                            setAnswers({ ...answers, [index]: opt })
                          }
                          disabled={submitted}
                        />{" "}
                        {opt}
                      </label>
                    ))}
                    {submitted && (
                      <p
                        style={{
                          color: answers[index] === q.answer ? "green" : "red",
                        }}
                      >
                        {answers[index] === q.answer
                          ? "✅ Correct"
                          : `❌ Mauvais, réponse : ${q.answer}`}
                      </p>
                    )}
                  </div>
                ))}
              {openContent["quiz"] && !submitted && (
                <button className="btn" onClick={() => setSubmitted(true)}>
                  Valider le quiz
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
