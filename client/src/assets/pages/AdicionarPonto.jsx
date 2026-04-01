import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import FormAdicionarPonto from "../components/FormAdicionarPonto"
import api from "../../services/api"

export default function AdicionarPonto() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">

        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6 lg:p-8 flex justify-center">

          <div className="w-full max-w-3xl">

            <h1 className="text-2xl font-bold mb-6">
              Adicionar Novo Ecoponto
            </h1>

            <FormAdicionarPonto />

          </div>

        </main>

      </div>

    </div>
  )
}