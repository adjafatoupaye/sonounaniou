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
        <h1>Module Jour 3</h1>

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
                <p
                  className={
                    quizAnswers[index] === q.answer ? "correct" : "wrong"
                  }
                >
                  {quizAnswers[index] === q.answer
                    ? "Correct ✅"
                    : `Faux ❌. La bonne réponse est ${q.answer}`}
                </p>
              )}
            </div>
          ))}

          {!submitted && (
            <button onClick={handleSubmit}>Valider le quiz</button>
          )}
        </section>
      </div>
    </div>
  );
}
