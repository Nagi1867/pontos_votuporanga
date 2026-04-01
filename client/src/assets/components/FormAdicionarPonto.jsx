import { useState } from "react"

export default function FormAdicionarPonto() {
  return (

    <form
      className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-6"
    >
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

      <div className="flex flex-col md:flex-row gap-3 pt-4">

        <button
          type="submit"
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Salvar
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