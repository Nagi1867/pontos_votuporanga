import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Stats from "../../components/Stats";
import EcopontoCard from "../../components/EcopontoCard";

import api from "../../../services/api";

export default function Pontos() {
  const [pontos, setPontos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [buscandoProximos, setBuscandoProximos] = useState(false);
  const [modoProximos, setModoProximos] = useState(false);

  // Role do usuário logado
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioRole = localStorage.getItem("role");

    setRole(usuarioRole);

    carregarPontos();
  }, []);

async function carregarPontos() {
  try {
    setLoading(true);
    setErro("");

    const response = await api.get("/pontos");

    console.log("STATUS:", response.status);
    console.log("RESPOSTA /pontos:", response.data);
    console.log("É ARRAY?", Array.isArray(response.data));

    setPontos(response.data);
    setModoProximos(false);

  } catch (err) {
    console.error("ERRO:", err);
    console.error("STATUS:", err.response?.status);
    console.error("DATA:", err.response?.data);

    setErro(
      err.response?.data?.error ||
      "Não foi possível carregar os ecopontos."
    );

  } finally {
    setLoading(false);
  }
}

  async function deletePonto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este ecoponto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await api.delete(`/pontos/${id}`);

      setPontos((prev) =>
        prev.filter((ponto) => ponto.id !== id)
      );
    } catch (err) {
      console.error(err);

      if (err.response?.status === 403) {
        setErro(
          "Você não possui permissão para excluir este ecoponto."
        );
      } else {
        setErro(
          "Não foi possível excluir o ecoponto. Tente novamente."
        );
      }
    }
  }

  async function buscarPontosProximos() {
    if (!navigator.geolocation) {
      setErro("Seu navegador não suporta localização.");
      return;
    }

    setBuscandoProximos(true);
    setErro("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const response = await api.get(
            `/pontos/proximos?lat=${lat}&lng=${lng}`
          );

          setPontos(response.data);
          setModoProximos(true);
        } catch (err) {
          console.error(err);

          setErro(
            "Não foi possível buscar os ecopontos próximos."
          );
        } finally {
          setBuscandoProximos(false);
        }
      },
      (error) => {
        console.error(error);

        setBuscandoProximos(false);

        if (error.code === 1) {
          setErro(
            "Permissão de localização negada. Permita o acesso à localização para encontrar pontos próximos."
          );
        } else {
          setErro(
            "Não foi possível obter sua localização."
          );
        }
      }
    );
  }

  async function pesquisarPontos(nome) {
    setPesquisa(nome);
    setErro("");

    try {
      if (!nome.trim()) {
        await carregarPontos();
        return;
      }

      setLoading(true);

      const response = await api.get(
        `/pontos/pesquisar?nome=${encodeURIComponent(nome)}`
      );

      setPontos(response.data);
      setModoProximos(false);
    } catch (err) {
      console.error(err);

      setErro(
        "Não foi possível realizar a pesquisa."
      );
    } finally {
      setLoading(false);
    }
  }

  function limparPesquisa() {
    setPesquisa("");
    carregarPontos();
  }

  async function mostrarTodos() {
    setPesquisa("");
    await carregarPontos();
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col w-full">

        <Header
          setSidebarOpen={setSidebarOpen}
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          pesquisarPontos={pesquisarPontos}
        />

        <main className="p-4 md:p-6 lg:p-8 space-y-6">

          {/* Título */}

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Ecopontos
            </h1>

            <p className="text-gray-500 mt-1">
              Encontre e gerencie pontos de coleta da sua região.
            </p>
          </div>


          {/* Estatísticas */}

          <Stats pontos={pontos} />


          {/* Mensagem de erro */}

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

              <p className="text-sm">
                {erro}
              </p>

              <button
                onClick={carregarPontos}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
              >
                Tentar novamente
              </button>

            </div>
          )}


          {/* Botões */}

          <div className="flex flex-col sm:flex-row gap-3">

            {/* SOMENTE ADMIN */}

            {role === "ADMIN" && (
              <button
                onClick={() => navigate("/adicionarponto")}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
              >
                + Novo Ecoponto
              </button>
            )}


            {/* Todos os usuários */}

            <button
              onClick={buscarPontosProximos}
              disabled={buscandoProximos}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {buscandoProximos
                ? "Buscando localização..."
                : "📍 Pontos próximos"}
            </button>


            {/* Mostrar todos */}

            {(modoProximos || pesquisa) && (
              <button
                onClick={mostrarTodos}
                className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition"
              >
                Mostrar todos
              </button>
            )}

          </div>


          {/* Aviso de pontos próximos */}

          {modoProximos && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3 text-sm">
              📍 Mostrando ecopontos próximos à sua localização.
            </div>
          )}


          {/* Resultado da pesquisa */}

          {pesquisa && (
            <div className="flex items-center justify-between text-sm text-gray-600">

              <span>
                Resultados para:{" "}
                <strong>{pesquisa}</strong>
              </span>

              <button
                onClick={limparPesquisa}
                className="text-red-500 hover:text-red-700"
              >
                Limpar
              </button>

            </div>
          )}


          {/* Loading */}

          {loading ? (

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
                >

                  <div className="h-40 bg-gray-200" />

                  <div className="p-5 space-y-3">

                    <div className="h-5 bg-gray-200 rounded w-2/3" />

                    <div className="h-4 bg-gray-200 rounded w-full" />

                    <div className="h-4 bg-gray-200 rounded w-1/2" />

                    <div className="flex gap-3 pt-3">

                      <div className="h-9 bg-gray-200 rounded-lg flex-1" />

                      <div className="h-9 bg-gray-200 rounded-lg flex-1" />

                    </div>

                  </div>

                </div>
              ))}

            </div>


          ) : pontos.length === 0 ? (

            /* Nenhum ponto */

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <div className="text-5xl mb-4">
                ♻️
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                Nenhum ecoponto encontrado
              </h2>

              <p className="text-gray-500 mt-2">

                {pesquisa
                  ? "Não encontramos nenhum ponto com esse nome."
                  : modoProximos
                    ? "Não encontramos pontos próximos à sua localização."
                    : "Ainda não existem ecopontos cadastrados."}

              </p>


              <div className="mt-5 flex justify-center gap-3">

                {/* Limpar pesquisa */}

                {pesquisa && (
                  <button
                    onClick={limparPesquisa}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Limpar pesquisa
                  </button>
                )}


                {/* SOMENTE ADMIN */}

                {!pesquisa &&
                  !modoProximos &&
                  role === "ADMIN" && (

                    <button
                      onClick={() => navigate("/adicionarponto")}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Adicionar primeiro ecoponto
                    </button>

                  )}


                {/* Mostrar todos */}

                {modoProximos && (
                  <button
                    onClick={mostrarTodos}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Mostrar todos
                  </button>
                )}

              </div>

            </div>


          ) : (

            /* Lista de ecopontos */

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

              {pontos.map((item) => {

                const p = item.ponto || item;

                return (

                  <EcopontoCard
                    key={p.id}

                    nome={p.nome}

                    endereco={p.localizacao}

                    descricao={p.descricao}

                    capa={p.capa}

                    latitude={p.latitude}

                    longitude={p.longitude}

                    distancia={item.distancia}

                    materiaisAceitos={p.materiaisAceitos}

                    /*
                     * Somente ADMIN pode
                     * editar/excluir.
                     */

                    podeEditar={role === "ADMIN"}

                    onDelete={() => deletePonto(p.id)}

                    onEdit={() =>
                      navigate(`/adicionarponto/${p.id}`)
                    }

                    onDetails={() =>
                      navigate(`/pontos/${p.id}`)
                    }

                  />

                );

              })}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}