import React from "react";
import { useState } from 'react';
import "../login/styled.css";
import { Link } from 'react-router-dom';
import Logo from "../../imagens/Logo.png";

function Login() {
  // Define os estados para username, password e token
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [token, settoken] = useState("");

  
  function comportament_botao(e) {
    e.preventDefault(); 

    // Cria um objeto body com as credenciais do usuário
    const body = {
      username: username,
      password: password
    };

    // Envia uma requisição POST para o endpoint de login
    fetch('https://api.secureme.me/api/v1/auth/login', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (response.ok) {
          // Redireciona para a página de feed se as credenciais estiverem corretas
          window.location.href = "/feed";
          return response.json();
        }
        throw new Error("Credenciais Inválidas!");
      }).then((token) => {
        // Armazena o token no estado e na sessionStorage
        settoken(token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', token.token);
      }).catch((error) => {
        alert("Esqueceu-se da sua Palavra-passe?");
      });
  }

  return (
    <div className='container_login'>
      <div className='container_login_1'></div>
      <div className='container_login_2'>
        <img src={Logo} alt="Logo" className="logo-image" />
        <form className="formulario_login" onSubmit={comportament_botao}>
          <div className="div_input_login">
            <input
              type="username"
              id="username_login"
              name="username"
              placeholder="Nome de Utilizador"
              value={username}
              onChange={(event) => { setusername(event.target.value) }}
              required
            />
          </div>
          <div className="div_input_login">
            <input
              type="password"
              id="password_login"
              name="password"
              placeholder="Palavra-Passe"
              value={password}
              onChange={(event) => { setpassword(event.target.value) }}
              required
            />
          </div>
          <div className="div_login_button">
            <button id="button_login" type="submit">Iniciar Sessão</button>
          </div>
        </form>
        <Link id='nao_tem_conta_login' to="/registo">Não tem conta? Registe-se</Link>
      </div>
    </div>
  );
}

export default Login;
