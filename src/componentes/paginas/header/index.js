import React from "react";
import "../header/styled.css";
import Logo from "../../imagens/Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
    
    try {
      await axios.post("https://api.secureme.me/api/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Limpar o token no armazenamento de sessão
      sessionStorage.removeItem("token");
      
      
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="container_header">
      <img className="logo_imagem_header" src={Logo} alt="Logotipo" />
      <Link to="/feed">
        <button className="link_button_header1">Página Inicial</button>
      </Link>
      <Link to="/locations_list">
        <button className="link_button_header2">Últimas Localizações</button>
      </Link>
      <button className="link_button_header3" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Header;
