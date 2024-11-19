import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../../imagens/marker.png";
import "../Map/styled.css";

function Map({ latitude, longitude, searchLocation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    if (latitude && longitude) {
      mapRef.current.setView([latitude, longitude], 10);

      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });

      L.marker([latitude, longitude], { icon: customIcon }).addTo(mapRef.current);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (searchLocation && searchLocation.latitude && searchLocation.longitude) {
      mapRef.current.setView(
        [searchLocation.latitude, searchLocation.longitude],
        10
      );

      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });

      L.marker(
        [searchLocation.latitude, searchLocation.longitude],
        { icon: customIcon }
      ).addTo(mapRef.current);
    }
  }, [searchLocation]);

  return <div id="map" className="map-container"></div>;
}

export default Map;
