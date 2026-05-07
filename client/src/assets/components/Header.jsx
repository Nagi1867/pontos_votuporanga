export default function Header({ setSidebarOpen, pesquisa, setPesquisa, pesquisarPontos }) {
  return (
    <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-4">
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Pontos de Coleta
          </h1>

          <p className="text-gray-500 text-sm">
            Gerencie os ecopontos da sua região
          </p>
        </div>

      </div>

      <input
        placeholder="Buscar..."
        value={pesquisa}
        onChange={(e) => {
          setPesquisa(e.target.value)
          pesquisarPontos(e.target.value)
        }}
        className="hidden md:block bg-gray-100 rounded-xl px-4 py-2 w-64 outline-none"
      />

    </header>
  )
}