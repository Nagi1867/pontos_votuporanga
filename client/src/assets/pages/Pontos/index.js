import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import Stats from "../../components/Stats"
import EcopontoCard from "../../components/EcopontoCard"

export default function Pontos() {
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
    <div className="flex h-screen bg-slate-100">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <div className="p-8 space-y-6 overflow-auto">

          <Stats />

          <div className="grid grid-cols-2 gap-6">
            {pontos.map((p, i) => (
              <EcopontoCard key={i} {...p} />
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}