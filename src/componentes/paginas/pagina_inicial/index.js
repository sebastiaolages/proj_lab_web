import React from 'react';
import {Link } from 'react-router-dom';



import "../pagina_inicial/styled.css";
import Logo from "../../imagens/Logo.png";

function PInicial(){
    return (
        
        <div className='container_pagina_inicial'>
            
            <div className='container_pagina_inicial_1'>
                <img className='logo_imagem_pi' src={Logo} alt="logotipo"/> 
                
                
            </div>

            <div className="container_pagina_inicial_2">
                
                <p>Junta-te ao Locgram</p>
                <Link className='link_pi' to ="/registo">Registe-se</Link>
            
                <Link className='link_pi' to ="/login">Iniciar sessão</Link>
                
                
            </div>

           
            
        </div>
       
    );
}

export default PInicial;