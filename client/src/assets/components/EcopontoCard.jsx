export default function EcopontoCard({
  nome,
  endereco,
  descricao,
  capa,
  latitude,
  longitude,
  distancia,
  materiaisAceitos,
  podeEditar,
  onDelete,
  onEdit,
  onDetails,
}) {

  function abrirMapa() {
    if (
      latitude === null ||
      latitude === undefined ||
      longitude === null ||
      longitude === undefined
    ) {
      alert("Localização indisponível.");
      return;
    }

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    window.open(url, "_blank");
  }

  function confirmarExclusao() {
    const confirmar = window.confirm(
      `Deseja realmente excluir o ecoponto "${nome}"?`
    );

    if (confirmar) {
      onDelete();
    }
  }

  function formatarDistancia() {
    if (distancia === null || distancia === undefined) {
      return null;
    }

    return Number(distancia).toFixed(2);
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition relative">

      {/* Botão excluir - SOMENTE ADMIN */}
      {podeEditar && (
        <button
          onClick={confirmarExclusao}
          title="Excluir ecoponto"
          className="
            absolute
            top-3
            right-3
            z-10
            bg-white/90
            backdrop-blur
            p-2
            rounded-full
            shadow
            hover:bg-red-100
            transition
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-600 hover:text-red-600"
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
      )}

      {/* Capa */}
      <div className="h-44 bg-gray-200 flex items-center justify-center overflow-hidden">

        {capa ? (
          <img
            src={`/images/${capa}`}
            alt={nome}
            className="
              w-full
              h-full
              object-cover
              transition
              duration-300
              hover:scale-105
            "
          />
        ) : (
          <div className="text-gray-500 text-sm">
            Sem imagem disponível
          </div>
        )}

      </div>

      {/* Conteúdo */}
      <div className="p-5">

        <h2 className="font-bold text-lg text-gray-800">
          {nome}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          📍 {endereco}
        </p>

        {/* Distância */}
        {formatarDistancia() && (
          <div
            className="
              inline-flex
              items-center
              mt-3
              px-3
              py-1
              rounded-full
              bg-blue-50
              text-blue-600
              text-sm
            "
          >
            📏 {formatarDistancia()} km de distância
          </div>
        )}

        {/* Descrição */}
        {descricao && (
          <p
            className="
              text-sm
              text-gray-600
              mt-4
              line-clamp-3
            "
          >
            {descricao}
          </p>
        )}

        {/* Materiais aceitos */}
        {materiaisAceitos && materiaisAceitos.length > 0 && (
          <div className="mt-4">

            <p className="text-sm font-medium text-gray-700 mb-2">
              Materiais aceitos
            </p>

            <div className="flex flex-wrap gap-2">

              {materiaisAceitos.map((material, index) => (
                <span
                  key={index}
                  className="
                    px-2.5
                    py-1
                    bg-green-50
                    text-green-700
                    rounded-full
                    text-xs
                    font-medium
                  "
                >
                  {material}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* Coordenadas */}
        {latitude !== null &&
          latitude !== undefined &&
          longitude !== null &&
          longitude !== undefined && (
            <p className="text-xs text-gray-400 mt-4">
              Lat: {latitude} | Lng: {longitude}
            </p>
          )}

        {/* Botões */}
        <div
          className={`grid ${
            podeEditar
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          } gap-2 mt-5`}
        >

          {/* Detalhes - todos */}
          <button
            onClick={onDetails}
            className="
              bg-gray-100
              text-gray-700
              py-2
              rounded-lg
              text-sm
              font-medium
              hover:bg-gray-200
              transition
            "
          >
            🔎 Detalhes
          </button>

          {/* Editar - SOMENTE ADMIN */}
          {podeEditar && (
            <button
              onClick={onEdit}
              className="
                bg-green-100
                text-green-700
                py-2
                rounded-lg
                text-sm
                font-medium
                hover:bg-green-200
                transition
              "
            >
              ✏️ Editar
            </button>
          )}

          {/* Mapa - todos */}
          <button
            onClick={abrirMapa}
            className="
              bg-blue-100
              text-blue-700
              py-2
              rounded-lg
              text-sm
              font-medium
              hover:bg-blue-200
              transition
            "
          >
            🗺️ Mapa
          </button>

        </div>

      </div>

    </div>
  );
}