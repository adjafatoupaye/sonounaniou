import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Header.css";

export default function Header({ userName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="app-header">
      {/* Logo à gauche */}
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/image/al.png`} alt="Logo" />
      </div>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input type="text" placeholder="Rechercher un module..." />
        <button>
          <FaSearch />
        </button>
      </div>

      {/* Profil utilisateur */}
      <div className="user-profile">
        <span
          className="user-name"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userName} <FaUserCircle className="user-icon" />
        </span>
        {dropdownOpen && (
          <div className="dropdown">
            <button className="btn-logout">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
}