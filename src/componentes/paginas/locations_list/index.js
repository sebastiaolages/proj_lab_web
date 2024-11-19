import React, { useState } from "react";
import "../locations_list/styled.css";
import Header from "../header";

function LocationsList() {
  // Estado para armazenar a data de início da pesquisa
  const [startDate, setStartDate] = useState("");
  // Estado para armazenar a data do fim da pesquisa
  const [endDate, setEndDate] = useState("");
  // Estado para armazenar a lista de localizações retornadas pela pesquisa
  const [locations, setLocations] = useState([]);
  // Estado para controlar a ordem de classificação das localizações (ascendente ou descendente)
  const [sortOrder, setSortOrder] = useState("asc");

  // Função chamada ao clicar no botão de pesquisa
  const handleSearch = () => {
    const token = sessionStorage.getItem("token");

    const body = {
      start: startDate,
      end: endDate,
    };

    // Envia a solicitação de pesquisa para o servidor
    fetch("https://api.secureme.me/api/v1/position/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("User Token Malformed");
        } else if (response.status === 404) {
          throw new Error("User Not found");
        } else {
          throw new Error("Error: Internal Server Error");
        }
      })
      .then((data) => {
        // Verifica se a resposta contém uma lista de localizações
        if (Array.isArray(data.locations)) {
          // Atualiza o estado com as localizações encontradas
          setLocations(data.locations);
        } else {
          // Caso contrário, define a lista de localizações como vazia
          setLocations([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função chamada ao clicar no botão de ordenação
  const handleSortOrder = () => {
    // Inverte a ordem de classificação atual (ascendente ou descendente)
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    
    const sortedLocations = [...locations].sort((a, b) => {
      if (newSortOrder === "asc") {
        return new Date(a.CreatedAt) - new Date(b.CreatedAt);
      } else {
        return new Date(b.CreatedAt) - new Date(a.CreatedAt);
      }
    });

    // Atualiza o estado com a lista de localizações ordenada
    setLocations(sortedLocations);
  };

  // Função chamada ao clicar no botão de exclusão de uma localização
  const handleDeleteLocation = (id) => {
    const token = sessionStorage.getItem("token");

    // Envia a solicitação de exclusão para o servidor
    fetch(`https://api.secureme.me/api/v1/position/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Exclusão bem-sucedida
          console.log("Delete succeeded!");
          // Atualiza a lista de localizações, removendo a localização excluída
          const updatedLocations = locations.filter((location) => location.ID !== id);
          setLocations(updatedLocations);
        } else if (response.status === 404) {
          throw new Error("None found!");
        } else {
          throw new Error("Error: Internal Server Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className="StartDate_container">
          <label htmlFor="startDate" className="StartDate">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="EndDate_container">
          <label htmlFor="endDate" className="EndDate">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="button_container">
          <button onClick={handleSearch} className="search_button">
            Procurar
          </button>

          <button onClick={handleSortOrder} className="sort_button">
            Ordenar: {sortOrder === "asc" ? "Antigas" : "Recentes"}
          </button>
        </div>

        {locations.length > 0 ? (
          <ul>
            {locations.map((location, index) => (
              <li key={index}>
                Latitude: {location.Latitude}, Longitude: {location.Longitude}
                <button
                  onClick={() => handleDeleteLocation(location.ID)}
                  className="delete_button"
                >
                  apagar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="noLocations">Localizações não encontradas</p>
        )}
      </div>
    </div>
  );
}

export default LocationsList;
