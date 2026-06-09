import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import MapaSelecao from "./MapaSelecao";

export default function FormAdicionarPonto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [capa, setCapa] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/pontos/${id}`)
        .then((res) => {
          setNome(res.data.nome);
          setDescricao(res.data.descricao);
          setLocalizacao(res.data.localizacao);
          setCapa(res.data.capa);

          setLatitude(res.data.latitude);
          setLongitude(res.data.longitude);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao carregar ponto");
        });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const data = {
      nome,
      descricao,
      localizacao,
      capa,
      latitude,
      longitude,
    };

    try {
      if (id) {
        // UPDATE
        await api.put(`/pontos/${id}`, data);
      } else {
        // CREATE
        await api.post("/pontos", data);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-6
        md:p-8
        rounded-2xl
        shadow
        space-y-6
      "
    >
      {/* NOME */}
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>

        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="
            w-full
            bg-gray-100
            px-4
            py-2
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-green-500
            transition
          "
        />
      </div>

      {/* DESCRIÇÃO */}
      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          className="
            w-full
            bg-gray-100
            px-4
            py-2
            rounded-lg
            outline-none
            resize-none
            focus:ring-2
            focus:ring-green-500
            transition
          "
        />
      </div>

      {/* LOCALIZAÇÃO */}
      <div>
        <label className="block text-sm font-medium mb-1">Localização</label>

        <input
          required
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className="
            w-full
            bg-gray-100
            px-4
            py-2
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-green-500
            transition
          "
        />

        {/* LOCALIZAÇÃO NO MAPA */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Localização no mapa
          </label>

          <MapaSelecao
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>

        {/* COORDENADAS */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            value={latitude}
            readOnly
            placeholder="Latitude"
            className="
              w-full
              bg-gray-100
              px-4
              py-2
              rounded-lg
            "
          />

          <input
            value={longitude}
            readOnly
            placeholder="Longitude"
            className="
              w-full
              bg-gray-100
              px-4
              py-2
              rounded-lg
            "
          />
        </div>
      </div>

      {/* CAPA */}
      <div>
        <label className="block text-sm font-medium mb-2">Capa</label>

        <input
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
          className="
            w-full
            bg-gray-100
            px-4
            py-2
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-green-500
            transition
          "
        />

        {/* PREVIEW */}
        {capa && (
          <img
            src={capa}
            alt="Preview"
            className="
              w-full
              h-56
              object-cover
              rounded-xl
              mt-4
              border
            "
          />
        )}
      </div>

      {/* BOTÕES */}
      <div className="flex gap-3 pt-4">
        <button
          disabled={loading}
          className="
            flex-1
            bg-green-600
            text-white
            py-3
            rounded-lg
            hover:bg-green-700
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Salvando..." : id ? "Atualizar" : "Criar"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex-1
            bg-gray-200
            py-3
            rounded-lg
            hover:bg-gray-300
            transition
          "
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
