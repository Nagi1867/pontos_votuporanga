export default function EcopontoCard({ nome, endereco, descricao, capa }) {
  return (

    <div className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition">

      {/* CAPA */}
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {capa ? (
          <img 
            src={capa} 
            alt={nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-green-600 rounded-full"></div>
        )}
      </div>

      <div className="p-5">

        <h2 className="font-bold text-lg">
          {nome}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {endereco}
        </p>

        {/* DESCRIÇÃO */}
        {descricao && (
          <p className="text-sm text-gray-600 mt-3">
            {descricao}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm hover:bg-green-200 transition">
            Editar
          </button>

          <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm hover:bg-blue-200 transition">
            Ver no mapa
          </button>

        </div>

      </div>

    </div>

  )
}