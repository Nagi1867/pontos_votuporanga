import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import MapaSelecao from "./MapaSelecao";

const materiaisDisponiveis = [
  "Papel",
  "Plástico",
  "Vidro",
  "Metal",
  "Eletrônicos",
  "Pilhas e baterias",
  "Óleo de cozinha",
  "Pneus",
  "Roupas",
];

export default function FormAdicionarPonto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [capa, setCapa] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [materiaisAceitos, setMateriaisAceitos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/pontos/${id}`)
        .then((res) => {
          const ponto = res.data;

          setNome(ponto.nome || "");
          setDescricao(ponto.descricao || "");
          setLocalizacao(ponto.localizacao || "");
          setCapa(ponto.capa || "");
          setLatitude(ponto.latitude ?? "");
          setLongitude(ponto.longitude ?? "");
          setMateriaisAceitos(ponto.materiaisAceitos || []);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao carregar ponto");
        });
    }
  }, [id]);

  function alterarMaterial(material) {
    setMateriaisAceitos((prev) => {
      if (prev.includes(material)) {
        return prev.filter((item) => item !== material);
      }

      return [...prev, material];
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const data = {
      nome,
      descricao,
      localizacao,
      capa,
      latitude: latitude === "" ? null : Number(latitude),
      longitude: longitude === "" ? null : Number(longitude),
      materiaisAceitos,
    };

    try {
      if (id) {
        await api.put(`/pontos/${id}`, data);
      } else {
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
      <div>
        <label className="block text-sm font-medium mb-1">
          Nome
        </label>

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

      <div>
        <label className="block text-sm font-medium mb-1">
          Descrição
        </label>

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

      <div>
        <label className="block text-sm font-medium mb-1">
          Localização
        </label>

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

        <div className="mt-4">
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

      <div>
        <label className="block text-sm font-medium mb-3">
          Materiais aceitos
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {materiaisDisponiveis.map((material) => (
            <label
              key={material}
              className="
                flex
                items-center
                gap-3
                bg-gray-100
                px-4
                py-3
                rounded-lg
                cursor-pointer
                hover:bg-green-50
                transition
              "
            >
              <input
                type="checkbox"
                checked={materiaisAceitos.includes(material)}
                onChange={() => alterarMaterial(material)}
                className="w-4 h-4 accent-green-600"
              />

              <span className="text-sm text-gray-700">
                {material}
              </span>
            </label>
          ))}
        </div>

        {materiaisAceitos.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">
              Materiais selecionados
            </p>

            <div className="flex flex-wrap gap-2">
              {materiaisAceitos.map((material) => (
                <span
                  key={material}
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  "
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Capa
        </label>

        <select
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
          className="
            w-full
            bg-gray-100
            px-4
            py-2
            rounded-lg
            outline-none
          "
        >
          <option value="">
            Selecione uma capa
          </option>

          <option value="lixeira.jpg">
            Lixeira
          </option>

          <option value="lixeiras.jpg">
            Lixeiras
          </option>

          <option value="papel.jpg">
            Papel
          </option>
        </select>

        {capa && (
          <img
            src={`/images/${capa}`}
            alt="Preview"
            className="
              w-full
              h-52
              object-cover
              rounded-lg
              mt-3
            "
          />
        )}
      </div>

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
          {loading
            ? "Salvando..."
            : id
              ? "Atualizar"
              : "Criar"}
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