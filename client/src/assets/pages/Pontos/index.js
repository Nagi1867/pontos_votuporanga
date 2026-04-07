import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import Stats from "../../components/Stats"
import EcopontoCard from "../../components/EcopontoCard"

import api from "../../../services/api"

export default function Pontos() {
  const [pontos, setPontos] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    api.get("/pontos")
      .then(response => {
        setPontos(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full">

        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6 lg:p-8 space-y-6">

          <Stats />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {pontos.map((p) => (
              <EcopontoCard
                key={p.id}
                nome={p.nome}
                endereco={p.localizacao}
                descricao={p.descricao}
                capa={p.capa}
              />
            ))}
          </div>

        </main>

      </div>

    </div>
  )
}