import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Stats from "../../components/Stats";
import EcopontoCard from "../../components/EcopontoCard";

import api from "../../../services/api";

export default function Pontos() {
  const [pontos, setPontos] = useState([]);
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

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6 lg:p-8 space-y-6">
          <Stats />

          <button
            onClick={() => navigate("/adicionarponto")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Novo Ecoponto
          </button>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {pontos.map((p) => (
              <EcopontoCard
                key={p.id}
                nome={p.nome}
                endereco={p.localizacao}
                descricao={p.descricao}
                capa={p.capa}
                onDelete={() => deletePonto(p.id)}
                onEdit={() => navigate(`/adicionarponto/${p.id}`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}