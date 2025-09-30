export default function Progress({ progress }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ color: "#1b263b" }}>Progression: {progress}%</h3>
      <div
        style={{
          background: "#eee",
          width: "100%",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ffffffff, #b92119)",
            borderRadius: "10px",
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
