export default function EcopontoCard({ nome, endereco, materiais }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <div className="h-40 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="w-12 h-12 bg-green-600 rounded-full"></div>
      </div>

      <div className="p-5">

        <h2 className="font-bold text-lg">
          {nome}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {endereco}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {materiais.map((m, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full"
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-5">

          <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg">
            Editar
          </button>

          <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg">
            Ver no mapa
          </button>

        </div>

      </div>

    </div>
  )
}