import { useState } from "react"

export default function FormAdicionarPonto() {

  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()

    formData.append("nome", e.target.nome.value)
    formData.append("descricao", e.target.descricao.value)
    formData.append("localizacao", e.target.localizacao.value)

    if (file) {
      formData.append("capa", file)
    }

    try {
      await fetch("http://localhost:3000/pontos", {
        method: "POST",
        body: formData
      })

      alert("Ponto criado com sucesso")

    } catch (err) {
      console.error(err)
      alert("Erro ao criar ponto")
    }
  }

  function handleImage(e) {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >

      {/* Nome */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nome
        </label>

        <input
          name="nome"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Descrição
        </label>

        <textarea
          name="descricao"
          rows={3}
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none resize-none"
        />
      </div>

      {/* Localização */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Localização
        </label>

        <input
          name="localizacao"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Capa */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Capa
        </label>
        <input
          name="capa"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Botões */}
      <div className="flex flex-col md:flex-row gap-3 pt-4">

        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 bg-gray-200 py-3 rounded-lg"
        >
          Cancelar
        </button>

      </div>

    </form>
  )
}