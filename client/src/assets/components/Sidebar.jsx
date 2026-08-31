import { Recycle } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r p-6 flex flex-col justify-between transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div>
          <a href="/">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="font-bold text-lg">EcoTudo</h1>
                <p className="text-sm text-gray-500">Pontos de Coleta</p>
              </div>
            </div>
          </a>
          <a href="/adicionarponto">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700">
              + Adicionar Ponto
            </button>
          </a>

          <div className="mt-6 space-y-2">
            <a href="/">
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium">
                Pontos de Coleta
              </div>
            </a>

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

          <button className="text-red-500 mt-2">Sair</button>
        </div>
      </aside>
    </>
  );
}
