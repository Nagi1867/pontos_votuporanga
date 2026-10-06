import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pontos from "./assets/pages/Pontos";
import AdicionarPonto from "./assets/pages/AdicionarPonto";
import DetalhesPonto from "./assets/components/DetalhesPonto";
import Login from "./assets/pages/Login";
import Cadastro from "./assets/pages/Cadastro";

function Home() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Pontos />;
    }

    return <Login />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/adicionarponto"
                    element={<AdicionarPonto />}
                />

                <Route
                    path="/adicionarponto/:id"
                    element={<AdicionarPonto />}
                />

                <Route
                    path="/pontos/:id"
                    element={<DetalhesPonto />}
                />

                <Route path="/login" element={<Login />} />

                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    );
}