import { useState } from "react";
import "./Jour.css";

export default function Jour1() {
  // Exemple de quiz
  const quizQuestions = [
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

  const [quizAnswers, setQuizAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex, option) => {
    setQuizAnswers({ ...quizAnswers, [qIndex]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Emploi du temps Jour 1
  const sessions = [
    { time: "09h00 - 09h15", title: "Accueil" },
    { time: "09h15 - 09h30", title: "Mot de bienvenue + présentation des participants" },
    { time: "09h30 - 09h45", title: "Préparer la transformation" },
    { time: "09h45 - 11h00", title: "Atelier diagnostic interactif" },
    { time: "11h00 - 11h30", title: "Pause café" },
    { time: "11h30 - 12h00", title: "Présentation de l’entreprise DocuWare & Partenariat Al Amine / Ricoh" },
    { time: "12h00 - 13h00", title: "Conférence : La GED intelligente et l’impact de l’IA" },
    { time: "13h00 - 14h30", title: "Pause déjeuner" },
    { time: "14h30 - 14h45", title: "Cas d’usage concret (Parcours complet d’un document)" },
    { time: "14h45 - 15h00", title: "Démonstration immersive GED DocuWare" },
    { time: "15h00 - 15h15", title: "Gouvernance documentaire et rôles utilisateurs" },
    { time: "15h15 - 16h30", title: "Atelier pratique" },
    { time: "16h30 - 16h45", title: "Clôture + feedback + évaluation" },
  ];

  return (
    <div className="jour1-container">
      {/* Partie gauche animée */}
      <div className="jour1-left">
        <div className="circle circle-small"></div>
        <div className="circle circle-medium"></div>
        <div className="circle circle-large"></div>
      </div>

      {/* Partie droite contenu */}
      <div className="jour1-right">
        <h1>Module Jour 1</h1>

        {/* Section emploi du temps */}
        <section>
          <h2>Emploi du temps</h2>
          <ul className="emploi-du-temps">
            {sessions.map((s, i) => (
              <li key={i}>
                <strong>{s.time}</strong> : {s.title}
              </li>
            ))}
          </ul>
        </section>

        {/* Section support de cours */}
        <section>
          <h2>Support de cours</h2>
          <p>Téléchargez le PDF du cours :</p>
          <a href="/cours/jour1.pdf" target="_blank" rel="noopener noreferrer">
            Télécharger le support
          </a>
        </section>

        {/* Section vidéo */}
        <section>
          <h2>Vidéo explicative</h2>
          <video width="100%" controls>
            <source src="/videos/jour1.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </section>

        {/* Section quiz */}
        <section>
          <h2>Quiz de validation</h2>
          {quizQuestions.map((q, index) => (
            <div key={index} className="quiz-card">
              <p>{q.question}</p>
              {q.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={opt}
                    disabled={submitted}
                    onChange={() => handleAnswer(index, opt)}
                  />{" "}
                  {opt}
                </label>
              ))}
              {submitted && (
                <p className={quizAnswers[index] === q.answer ? "correct" : "wrong"}>
                  {quizAnswers[index] === q.answer
                    ? "Correct ✅"
                    : `Faux ❌. La bonne réponse est ${q.answer}`}
                </p>
              )}
            </div>
          ))}

          {!submitted && <button onClick={handleSubmit}>Valider le quiz</button>}
        </section>
      </div>
    </div>
  );
}
