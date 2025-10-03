import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-sidebar">
      <div style={{ width: `${progress}%` }}></div>
      <p>{progress}% complété</p>
    </div>
  );
}
