import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Recycle } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      const token = response.data.token;

      // Decodifica o JWT
      const decoded = jwtDecode(token);

      console.log("Dados do token:", decoded);
      console.log("Resposta do login:", response.data);

      // Tenta encontrar o nome do usuário
      const nome =
        response.data.nome ||
        response.data.name ||
        response.data.username ||
        decoded.nome ||
        decoded.name ||
        decoded.username ||
        email.split("@")[0];

      // E-mail
      const emailUsuario =
        response.data.email ||
        decoded.email ||
        decoded.sub ||
        email;

      // Role
      const role =
        response.data.role ||
        decoded.role ||
        "USER";

      // Salva os dados
      localStorage.setItem("token", token);
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", emailUsuario);
      localStorage.setItem("role", role);

      console.log("Usuário salvo:", {
        nome,
        email: emailUsuario,
        role,
      });

      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response?.status === 401) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Não foi possível realizar o login.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
              <Recycle className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              EcoTudo
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Entre na sua conta
            </p>
          </div>

          {/* Erro */}
          {erro && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {erro}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Cadastro */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Ainda não possui uma conta?
            </p>

            <Link
              to="/cadastro"
              className="inline-block mt-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
            >
              Criar uma conta
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}