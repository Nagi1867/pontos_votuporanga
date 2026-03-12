import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pontos from "./assets/pages/Pontos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pontos />} />
      </Routes>
    </BrowserRouter>
  );
}