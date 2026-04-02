import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function FormAdicionarPonto() {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [capa, setCapa] = useState("");

  const history = useNavigate();

  async function createNewPoint (e) {
    e.preventDefault();

    const data = {
      nome,
      descricao,
      localizacao,
      capa,
    };

    try {
      await api.post("/pontos", data);
      history("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erro ao salvar ponto");
    }
  }

  return (
    <form
      onSubmit={createNewPoint }
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>

        <input
          name="nome"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>

        <input
          name="descricao"
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none resize-none"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Localização</label>

        <input
          name="localizacao"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Capa</label>
        <input
          name="capa"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => history(-1)}
          className="flex-1 bg-gray-200 py-3 rounded-lg flex items-center justify-center"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
