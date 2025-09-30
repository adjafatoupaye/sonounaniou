import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      // ⚡ CSRF pour Sanctum
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });

      const response = await axios.post(
        "http://localhost:8000/api/change-password",
        {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        },
        { withCredentials: true } // ⚡ important pour envoyer le cookie
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la mise à jour.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2>Changer mon mot de passe</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Mot de passe actuel</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Nouveau mot de passe</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Confirmer le nouveau mot de passe</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>
        <button type="submit" style={{ backgroundColor: "#0c3a6a", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Mettre à jour</button>
      </form>
    </div>
  );
}
