function StatCard({ numero, titulo }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
        ♻️
      </div>

      <div>
        <p className="text-lg md:text-xl font-bold">
          {numero}
        </p>

        <p className="text-xs md:text-sm text-gray-500">
          {titulo}
        </p>
      </div>
    </div>
  );
}

export default function Stats({ pontos = [] }) {
  const totalPontos = pontos.length;

  const pontosCompletos = pontos.filter((ponto) => {
    return (
      ponto.nome &&
      ponto.descricao &&
      ponto.localizacao &&
      ponto.capa &&
      ponto.latitude &&
      ponto.longitude
    );
  }).length;

  const pontosComLocalizacao = pontos.filter((ponto) => {
    return ponto.latitude && ponto.longitude;
  }).length;

  const pontosComCapa = pontos.filter((ponto) => {
    return ponto.capa;
  }).length;

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <StatCard
        numero={totalPontos}
        titulo="Pontos cadastrados"
      />

      <StatCard
        numero={pontosCompletos}
        titulo="Pontos completos"
      />

      <StatCard
        numero={pontosComLocalizacao}
        titulo="Com localização"
      />

      <StatCard
        numero={pontosComCapa}
        titulo="Com imagem"
      />
    </div>
  );
}