export default function ModuleCard({ title }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        margin: "10px 0",
      }}
    >
      <h2>{title}</h2>
      <p>Support de cours</p>
      <p>Vidéo</p>
      <p>Quiz</p>
    </div>
  );
}
