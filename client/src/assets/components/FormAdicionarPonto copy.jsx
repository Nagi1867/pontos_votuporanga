import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function FormAdicionarPonto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [capa, setCapa] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/pontos/${id}`)
        .then(res => {
          setNome(res.data.nome);
          setDescricao(res.data.descricao);
          setLocalizacao(res.data.localizacao);
          setCapa(res.data.capa);
        })
        .catch(err => {
          console.error(err);
          alert("Erro ao carregar ponto");
        });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      nome,
      descricao,
      localizacao,
      capa,
    };

    try {
      if (id) {
        // UPDATE
        await api.put(`/pontos/${id}`, data);
      } else {
        // CREATE
        await api.post("/pontos", data);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Localização</label>
        <input
          required
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Capa</label>
        <input
          value={capa}
          onChange={(e) => setCapa(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg">
          {id ? "Atualizar" : "Criar"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-200 py-3 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}