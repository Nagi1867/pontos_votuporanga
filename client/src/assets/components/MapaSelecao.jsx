import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

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
    <Marker position={[latitude, longitude]} />
  );
}

export default function MapaSelecao({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {

  const centroInicial = [-20.4215, -49.9728]; // região de Valentim Gentil

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
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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