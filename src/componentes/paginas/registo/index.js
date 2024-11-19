import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import "../registo/styled.css";
import Logo from '../../imagens/Logo.png';

function Registo() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');

  function createUser(e) {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };

    // Faz uma solicitação POST para criar um novo usuário
    fetch("https://api.secureme.me/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          // Redireciona para a página de login se o registo for bem sucedido
          window.location.href = "/login";
          return response.json();
        } else if (response.status === 406) {
          setError("Não é possível criar a conta, o utilizador já existe.");
        } else {
          setError("Ocorreu um erro durante o registo. Por favor, tente novamente mais tarde.");
        }
      })
      .catch(err => {
        console.error(err);
        setError("Ocorreu um erro durante o registo. Por favor, tente novamente mais tarde.");
      });
  }

  return (
    <div className='container_registo'>
      <img src={Logo} alt="Logo" className="logo" />
      <div className='container_registo_1'></div>

      <div className='container_registo_2'>
        <form className="formulario_registo" onSubmit={createUser}>
          <div className="div_input_registo">
            <input
              type="text"
              id="input_registo"
              name="username"
              placeholder="Nome de Utilizador"
              value={username}
              onChange={(event) => { setusername(event.target.value) }}
              required
            />
          </div>

          <div className="div_input_registo">
            <input
              type="password"
              id="input_registo"
              name="password"
              placeholder="Palavra-passe"
              value={password}
              onChange={(event) => { setpassword(event.target.value) }}
              required
            />
          </div>

          <div className="div_button_registo">
            <button id="button_registo" type="submit">Registar</button>
          </div>

          <p className="link_message">Já tem conta? <Link to="/login" className="link_login">Inicie sessão</Link></p>

          <div>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={8}
              value={password}
              onChange={(isValid) => {}}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registo;
