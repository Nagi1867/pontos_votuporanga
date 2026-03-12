function StatCard({ numero, titulo }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-green-100 rounded-lg"></div>

      <div>
        <p className="text-xl font-bold">{numero}</p>
        <p className="text-sm text-gray-500">{titulo}</p>
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      <StatCard numero="6" titulo="Pontos ativos" />
      <StatCard numero="8" titulo="Tipos aceitos" />
      <StatCard numero="4" titulo="Pontos completos" />
      <StatCard numero="6" titulo="Bairros" />

    </div>
  )
}