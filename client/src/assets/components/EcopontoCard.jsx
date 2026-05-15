export default function EcopontoCard({
  nome,
  endereco,
  descricao,
  capa,
  distancia,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition relative">
      {/* BOTÃO X */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-red-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-600 hover:text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* CAPA */}
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {capa ? (
          <img src={capa} alt={nome} className="w-full h-full object-cover" />
        ) : (
          <div className="w-12 h-12 bg-green-600 rounded-full"></div>
        )}
      </div>

      <div className="p-5">
        <h2 className="font-bold text-lg">{nome}</h2>

        <p className="text-sm text-gray-500 mt-1">{endereco}</p>

        {distancia && (
          <p className="text-sm text-blue-600 mt-1">
            {distancia.toFixed(1)} km de distância
          </p>
        )}

        {descricao && <p className="text-sm text-gray-600 mt-3">{descricao}</p>}

        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button
            onClick={onEdit}
            className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm hover:bg-green-200 transition"
          >
            Editar
          </button>

          <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm hover:bg-blue-200 transition">
            Ver no mapa
          </button>
        </div>
      </div>
    </div>
  );
}
