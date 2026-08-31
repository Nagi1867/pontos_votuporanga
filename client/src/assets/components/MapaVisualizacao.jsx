import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapaVisualizacao({ latitude, longitude }) {
  if (latitude == null || longitude == null) {
    return (
      <div className="h-80 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
        Localização não disponível
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </div>
  );
}