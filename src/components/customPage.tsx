import React, { useState } from "react";

const DropdownMenus = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null); // Suivi du menu ouvert
  const [selectedOptions, setSelectedOptions] = useState<{
    type?: string;
    author?: string;
    movement?: string;
  }>({});

  const handleToggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleSelectOption = (
    category: "type" | "author" | "movement",
    option: string
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: option }));
    setOpenMenu(null); // Ferme le menu après sélection
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <h2 className="title">Choix des préférences</h2>

        {/* Menu Type */}
        <div className="dropdown">
          <button
            onClick={() => handleToggleMenu("type")}
            className="dropdown-button"
          >
            {selectedOptions.type || "Type d'œuvre"}
          </button>
          {openMenu === "type" && (
            <ul className="dropdown-menu">
              {["Peinture", "Sculpture", "Photographie"].map((type) => (
                <li
                  key={type}
                  onClick={() => handleSelectOption("type", type)}
                  className="dropdown-item"
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
        
    

        {/* Menu Auteur */}
        <div className="dropdown">
          <button
            onClick={() => handleToggleMenu("author")}
            className="dropdown-button"
          >
            {selectedOptions.author || "Auteur"}
          </button>
          {openMenu === "author" && (
            <ul className="dropdown-menu">
              {["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"].map(
                (author) => (
                  <li
                    key={author}
                    onClick={() => handleSelectOption("author", author)}
                    className="dropdown-item"
                  >
                    {author}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Menu Mouvement */}
        <div className="dropdown">
          <button
            onClick={() => handleToggleMenu("movement")}
            className="dropdown-button"
          >
            {selectedOptions.movement || "Mouvement"}
          </button>
          {openMenu === "movement" && (
            <ul className="dropdown-menu">
              {["Renaissance", "Impressionnisme", "Cubisme"].map((movement) => (
                <li
                  key={movement}
                  onClick={() => handleSelectOption("movement", movement)}
                  className="dropdown-item"
                >
                  {movement}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bouton Suivant */}
        <div className="button-container">
          <button className="next-button">Suivant</button>
        </div>
      </div>

      {/* Styles CSS */}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #FAF1E4;
          min-height: 100vh;
        }
        .dropdown-container {
          margin-top: -15rem;
          width: 100%;
          max-width: 400px;
          background-color: #FDE6CE;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .dropdown {
          position: relative;
          margin-bottom: 1rem;
        }
        .dropdown-button {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #FAF1E4;
          border-radius: 0.375rem;
          text-align: left;
          background-color: #FAF1E4;
          cursor: pointer;
        }
        .dropdown-menu {
          position: absolute;
          width: 100%;
          background-color: #FAF1E4;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          z-index: 10;
        }
        .dropdown-item {
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background-color: #f3f4f6;
        }
        .button-container {
          display: flex;
          justify-content: flex-end;
        }
        .next-button {
          padding: 0.5rem 1rem;
          background-color: #6366f1;
          color: #ffffff;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .next-button:hover {
          background-color: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default DropdownMenus;