import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pontos from "./assets/pages/Pontos";
import AdicionarPonto from "./assets/pages/AdicionarPonto";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pontos />} />
        <Route path="/adicionarponto" element={<AdicionarPonto />} />
        <Route path="/adicionarponto/:id" element={<AdicionarPonto />} />
      </Routes>
    </BrowserRouter>
  );
}
