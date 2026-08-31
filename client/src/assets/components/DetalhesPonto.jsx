import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MapaVisualizacao from "./MapaVisualizacao";
import api from "../../services/api";

export default function DetalhesPonto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ponto, setPonto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function carregarPonto() {
      try {
        const response = await api.get(`/pontos/${id}`);
        setPonto(response.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar o ecoponto.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    carregarPonto();
  }, [id, navigate]);

  async function excluirPonto() {
    const confirmar = window.confirm(
      "Deseja realmente excluir este ecoponto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/pontos/${id}`);

      alert("Ecoponto excluído com sucesso.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o ecoponto.");
    }
  }

  function abrirMapa() {
    if (ponto.latitude == null || ponto.longitude == null) {
      alert("Localização indisponível.");
      return;
    }

    window.open(
      `https://www.google.com/maps?q=${ponto.latitude},${ponto.longitude}`,
      "_blank"
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 text-center">
              <p className="text-gray-500">
                Carregando ecoponto...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!ponto) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col w-full">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-4">

            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              ← Voltar
            </button>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

              {ponto.capa ? (
                <div className="h-48 md:h-56 bg-gray-200">
                  <img
                    src={`/images/${ponto.capa}`}
                    alt={ponto.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                  Sem imagem
                </div>
              )}

              <div className="p-5 md:p-6">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {ponto.nome}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                      📍 {ponto.localizacao}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/adicionarponto/${ponto.id}`)
                      }
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-200 transition"
                    >
                      ✏️ Editar
                    </button>

                    <button
                      onClick={excluirPonto}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <h2 className="text-base font-bold mb-1">
                    Descrição
                  </h2>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ponto.descricao || "Nenhuma descrição cadastrada."}
                  </p>
                </div>

                <div className="mt-5">
                  <h2 className="text-base font-bold mb-3">
                    Materiais aceitos
                  </h2>

                  {ponto.materiaisAceitos &&
                  ponto.materiaisAceitos.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {ponto.materiaisAceitos.map((material, index) => (
                        <span
                          key={`${material}-${index}`}
                          className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1.5
                            rounded-full
                            text-sm
                            font-medium
                          "
                        >
                          ♻️ {material}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Nenhum material cadastrado.
                    </p>
                  )}
                </div>

                <div className="mt-5">
                  <h2 className="text-base font-bold mb-3">
                    Localização
                  </h2>

                  <MapaVisualizacao
                    latitude={ponto.latitude}
                    longitude={ponto.longitude}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">
                      Latitude
                    </p>

                    <p className="text-sm font-medium mt-1 truncate">
                      {ponto.latitude ?? "Não informada"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">
                      Longitude
                    </p>

                    <p className="text-sm font-medium mt-1 truncate">
                      {ponto.longitude ?? "Não informada"}
                    </p>
                  </div>

                </div>

                <button
                  onClick={abrirMapa}
                  className="
                    w-full
                    mt-4
                    bg-blue-600
                    text-white
                    py-2.5
                    rounded-lg
                    text-sm
                    hover:bg-blue-700
                    transition
                  "
                >
                  🗺️ Ver no Google Maps
                </button>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}