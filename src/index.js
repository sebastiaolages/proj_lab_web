import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Registo from "./componentes/paginas/registo";
import PInicial from "./componentes/paginas/pagina_inicial";
import Login from "./componentes/paginas/login"
import Feed from "./componentes/paginas/feed"
import Header from "./componentes/paginas/header"
import Map from "./componentes/paginas/Map";
import Perfil from "./componentes/paginas/perfil";
import LocList from "./componentes/paginas/locations_list";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PInicial} />
      <Route path='/registo' component={Registo} />
      <Route path='/login' component={Login} />
      <Route path='/feed' component={Feed} />
      <Route path='/header' component={Header} />
      <Route path="/map" component={Map} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/locations_list" component={LocList} />
      <Route path='/' component={App} />
    +
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
