export default function Header() {
  return (
    <div className="bg-white border-b px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold">Pontos de Coleta</h1>
        <p className="text-gray-500 text-sm">
          Gerencie os ecopontos da sua região
        </p>
      </div>

      <input
        placeholder="Buscar..."
        className="bg-gray-100 rounded-xl px-4 py-2 w-64 outline-none"
      />

    </div>
  )
}