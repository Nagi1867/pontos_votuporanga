import { Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const nome = localStorage.getItem("nome") || "Usuário";
  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "USER";

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  }

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
          {/* LOGO */}
          <a href="/">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="font-bold text-lg">EcoTudo</h1>
                <p className="text-sm text-gray-500">
                  Pontos de Coleta
                </p>
              </div>
            </div>
          </a>

          {/* ADICIONAR PONTO */}
          {role === "ADMIN" && (
            <button
              onClick={() => navigate("/adicionarponto")}
              className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
            >
              + Adicionar Ponto
            </button>
          )}

          {/* MENU */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full text-left bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium"
            >
              Pontos de Coleta
            </button>

            <button
              className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Estatísticas
            </button>

            <button
              className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Configurações
            </button>
          </div>
        </div>

        {/* USUÁRIO LOGADO */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold">
                {nome.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Informações */}
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {nome}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {email}
              </p>

              <p className="text-xs text-green-600 font-medium">
                {role === "ADMIN" ? "Administrador" : "Usuário"}
              </p>
            </div>
          </div>

          {/* SAIR */}
          <button
            onClick={sair}
            className="w-full text-left text-red-500 mt-4 px-2 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}