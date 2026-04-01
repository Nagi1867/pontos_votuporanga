import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import Stats from "../../components/Stats"
import EcopontoCard from "../../components/EcopontoCard"

export default function Pontos() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pontos = [
    {
      nome: "Ecoponto Central",
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      materiais: ["Plástico", "Papel", "Vidro", "Metal"]
    },
    {
      nome: "Ponto de Coleta Vila Mariana",
      endereco: "R. Domingos de Morais, 1234 - Vila Mariana, São Paulo - SP",
      materiais: ["Plástico", "Papel", "Eletrônicos"]
    }
  ]

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col w-full">

        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6 lg:p-8 space-y-6">

          <Stats />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {pontos.map((p, i) => (
              <EcopontoCard key={i} {...p} />
            ))}
          </div>

        </main>

      </div>

    </div>
  )
}