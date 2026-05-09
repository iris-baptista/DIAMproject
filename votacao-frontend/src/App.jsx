import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage.jsx";
import VotePage from "./pages/VotePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EditDetail from "./pages/EditDetail.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detalhe/:id" element={<DetailPage/>}/>
                <Route path="/votar/:id" element={<VotePage/>}/>
                <Route path="/criar" element={<CreatePage/>}/>
                <Route path="/editar/:id" element={<EditDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;