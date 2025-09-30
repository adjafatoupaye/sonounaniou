import { useState } from "react";
import Header from "../components/Header.js"; 
import { FaBook, FaBullseye, FaCalendarAlt } from "react-icons/fa";
import "./Jour.css";

export default function Jour1() {
  const [openSection, setOpenSection] = useState(null);
  const [openContent, setOpenContent] = useState({}); 

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
      title: "Support Jour 1",
      file: "/cours/Sequence1.pdf",
      description:
        "Ce module traite des bases de la GED (Gestion Électronique des Documents), ses principes fondamentaux et des cas pratiques pour mieux comprendre son utilisation en entreprise.",
    },
    {
      title: "Support Jour 2",
      file: "/cours/Sequence2.pdf",
      description:
        "Ce module approfondit la GED intelligente, en explorant les outils avancés et les techniques d’automatisation pour améliorer la productivité et la gestion documentaire.",
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

          <h2>Supports</h2>
          {supports.map((s, i) => (
            <div key={i} className="card">
              <h3>{s.title}</h3>
              <div className="btn-group">
                {/* Ouvrir le PDF dans une nouvelle page */}
                <a
                  href={s.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Ouvrir dans une nouvelle page
                </a>

                {/* Voir aperçu texte */}
                <button
                  className="btn"
                  onClick={() => toggleContent(`support${i}`)}
                >
                  {openContent[`support${i}`]
                    ? "▲ Masquer aperçu"
                    : "▼ Voir aperçu"}
                </button>
              </div>

              {openContent[`support${i}`] && (
                <div
                  className="preview-frame"
                  style={{
                    padding: "15px",
                    background: "#f5f5f5",
                    borderRadius: "12px",
                  }}
                >
                  <p>{s.description}</p>
                </div>
              )}
            </div>
          ))}

          {/* Vidéo */}
          <section>
            <h2>Vidéo explicative</h2>
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