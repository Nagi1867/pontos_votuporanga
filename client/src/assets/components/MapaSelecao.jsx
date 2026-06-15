import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrige o problema do ícone não aparecer no React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Componente que move o mapa até o ponto selecionado
function CentralizarMapa({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 16);
    }
  }, [latitude, longitude, map]);

  return null;
}

// Componente responsável por capturar o clique e exibir o marcador
function LocalizacaoMarker({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <Marker
      position={[latitude, longitude]}
    />
  );
}

export default function MapaSelecao({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {
  const centroInicial = [-20.4215, -49.9728];

  return (
    <div className="rounded-xl overflow-hidden border">
      <MapContainer
        center={centroInicial}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CentralizarMapa
          latitude={latitude}
          longitude={longitude}
        />

        <LocalizacaoMarker
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </MapContainer>
    </div>
  );
}