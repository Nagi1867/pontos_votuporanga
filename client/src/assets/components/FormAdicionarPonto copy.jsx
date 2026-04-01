import { useState } from "react"

export default function FormAdicionarPonto() {

  const [materiais, setMateriais] = useState([])

  const tipos = [
    "Plástico",
    "Papel",
    "Vidro",
    "Metal",
    "Eletrônicos",
    "Baterias",
    "Óleo"
  ]

  function toggleMaterial(tipo) {

    if (materiais.includes(tipo)) {
      setMateriais(materiais.filter(m => m !== tipo))
    } else {
      setMateriais([...materiais, tipo])
    }

  }

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      nome: e.target.nome.value,
      endereco: e.target.endereco.value,
      latitude: e.target.latitude.value,
      longitude: e.target.longitude.value,
      materiais
    }

    console.log(data)

    alert("Ponto adicionado (simulação)")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >

      {/* Nome */}

      <div>
        <label className="block text-sm font-medium mb-1">
          Nome do ponto
        </label>

        <input
          name="nome"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Endereço */}

      <div>
        <label className="block text-sm font-medium mb-1">
          Endereço
        </label>

        <input
          name="endereco"
          required
          className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Coordenadas */}

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Latitude
          </label>

          <input
            name="latitude"
            required
            className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Longitude
          </label>

          <input
            name="longitude"
            required
            className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
          />
        </div>

      </div>

      {/* Materiais */}

      <div>

        <label className="block text-sm font-medium mb-2">
          Materiais aceitos
        </label>

        <div className="flex flex-wrap gap-2">

          {tipos.map((tipo) => (

            <button
              type="button"
              key={tipo}
              onClick={() => toggleMaterial(tipo)}
              className={`px-4 py-2 rounded-full text-sm border transition
              
              ${materiais.includes(tipo)
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-100 text-gray-600 border-gray-200"
              }
              
              `}
            >
              {tipo}
            </button>

          ))}

        </div>

      </div>

      {/* Botões */}

      <div className="flex flex-col md:flex-row gap-3 pt-4">

        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Salvar Ecoponto
        </button>

        <button
          type="button"
          className="flex-1 bg-gray-200 py-3 rounded-lg"
        >
          Cancelar
        </button>

      </div>

    </form>
  )
}