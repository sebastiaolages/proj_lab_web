import React, { useState, useEffect } from "react";
import Header from "../header";
import Map from "../Map";
import "../feed/styled.css";

function Feed() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [recentLocation, setRecentLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  const handleShareLocation = () => {
    const token = sessionStorage.getItem("token");
    const body = {
      Latitude: parseFloat(latitude),
      Longitude: parseFloat(longitude),
    };

    // Envia a localização para o servidor
    fetch("https://api.secureme.me/api/v1/position/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Localização partilhada com sucesso!");
          setRecentLocation({ latitude, longitude });
        } else {
          throw new Error("Erro ao partilhar localização.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // Obtém as localizações do servidor
    fetch("https://api.secureme.me/api/v1/position/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao obter localização.");
        }
      })
      .then((data) => {
        if (data.location) {
          // Define a localização mais recente
          setRecentLocation({
            latitude: data.location.Latitude,
            longitude: data.location.Longitude,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowLocation = () => {
    if (latitude !== "" && longitude !== "") {
      setSearchLocation({ latitude, longitude });
    }
  };

  return (
    <div>
      <Header />
      <div className="content_container">
        <div className="input_container">
          <label className="letters1">Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <label className="letters2">Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div className="button_container">
          <button className="search_button" onClick={handleShowLocation}>
            Procurar
          </button>
          <button className="share_button" onClick={handleShareLocation}>
            Partilhar
          </button>
        </div>
      </div>
      <Map
        latitude={recentLocation ? recentLocation.latitude : null}
        longitude={recentLocation ? recentLocation.longitude : null}
        searchLocation={searchLocation}
      />
      <div className="recent_location_box">
        <h3>Última Localização</h3>
        <ul className="last_location">
          {recentLocation && (
            <li>
              Latitude: {recentLocation.latitude}, Longitude:{" "}
              {recentLocation.longitude}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Feed;
