import { BrouserRouter, Route, Routes} from "react-router-dom"

import Pontos from "./pages/Pontos"
import NovosPontos from "./pages/NovosPontos"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Pontos/>}/>
                <Route path="/pontos/novo" element={<NovosPontos/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}