import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Recycle } from "lucide-react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleCadastro(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      await api.post("/auth/cadastro", {
        nome,
        email,
        senha,
      });

      setSucesso("Conta criada com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Erro no cadastro:", error);

      const dadosErro = error.response?.data;

      /*
       * Trata os diferentes formatos de erro
       * que podem ser retornados pelo backend.
       */

      if (error.response?.status === 409) {
        setErro("Este e-mail já está cadastrado.");

      } else if (typeof dadosErro === "string") {
        setErro(dadosErro);

      } else if (dadosErro?.message) {
        setErro(dadosErro.message);

      } else if (dadosErro?.error) {
        setErro(
          `Erro ${dadosErro.status || error.response?.status}: ${dadosErro.error}`
        );

      } else if (error.response?.status) {
        setErro(
          `Erro ${error.response.status}: Não foi possível criar a conta.`
        );

      } else {
        setErro(
          "Não foi possível conectar ao servidor."
        );
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
              Crie sua conta
            </p>

          </div>


          {/* Erro */}

          {erro && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {erro}
            </div>
          )}


          {/* Sucesso */}

          {sucesso && (
            <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
              {sucesso}
            </div>
          )}


          {/* Formulário */}

          <form
            onSubmit={handleCadastro}
            className="space-y-5"
          >

            {/* Nome */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required
                disabled={carregando}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />

            </div>


            {/* E-mail */}

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
                disabled={carregando}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
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
                minLength={6}
                disabled={carregando}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              />

              <p className="text-xs text-gray-400 mt-1">
                Mínimo de 6 caracteres
              </p>

            </div>


            {/* Botão */}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {carregando
                ? "Criando conta..."
                : "Criar conta"}

            </button>

          </form>


          {/* Voltar para login */}

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">

            <p className="text-sm text-gray-500">
              Já possui uma conta?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
            >
              Entrar
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}