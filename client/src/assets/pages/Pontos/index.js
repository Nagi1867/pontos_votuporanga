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

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/pontos")
      .then((response) => {
        setPontos(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function deletePonto(id) {
    try {
      await api.delete(`pontos/${id}`);
      setPontos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Delete failed! Try again.");
    }
  }

  async function buscarPontosProximos() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const response = await api.get(
            `/pontos/proximos?lat=${lat}&lng=${lng}`,
          );

          setPontos(response.data);
        } catch (err) {
          console.log(err);
        }
      },

      (error) => {
        console.log(error);
        alert("Erro ao obter localização");
      },
    );
  }

  async function pesquisarPontos(nome) {
    try {
      if (!nome.trim()) {
        const response = await api.get("/pontos");
        setPontos(response.data);
        return;
      }

      const response = await api.get(
        `/pontos/pesquisar?nome=${encodeURIComponent(nome)}`,
      );

      setPontos(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full">
        <Header
          setSidebarOpen={setSidebarOpen}
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          pesquisarPontos={pesquisarPontos}
        />

        <main className="p-4 md:p-6 lg:p-8 space-y-6">
          <Stats />

          <button
            onClick={() => navigate("/adicionarponto")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Novo Ecoponto
          </button>

          <button
            onClick={buscarPontosProximos}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-3"
          >
            Pontos Próximos
          </button>

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
                distancia={item.distancia}
                onDelete={() => deletePonto(p.id)}
                onEdit={() => navigate(`/adicionarponto/${p.id}`)}
              />
            )})}
          </div>
        </main>
      </div>
    </div>
  );
}
