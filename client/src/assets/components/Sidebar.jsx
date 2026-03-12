export default function Sidebar() {
  return (
    <div className="w-72 bg-white border-r p-6 flex flex-col justify-between">

      <div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-600 rounded-lg"></div>
          <div>
            <h1 className="font-bold text-lg">EcoTudo</h1>
            <p className="text-sm text-gray-500">Pontos de Coleta</p>
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700">
          + Adicionar Ponto
        </button>

        <div className="mt-6 space-y-2">

          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium">
            Pontos de Coleta
          </div>

          <div className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            Estatísticas
          </div>

          <div className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            Configurações
          </div>

        </div>

      </div>

      <div className="text-sm text-gray-500">
        <p className="font-semibold">Admin</p>
        <p>admin@ecotudo.com</p>

        <button className="text-red-500 mt-2">
          Sair
        </button>
      </div>

    </div>
  )
}