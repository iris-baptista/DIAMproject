import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "reactstrap";
import axios from "axios";
import DetailData from "../components/DetailData.jsx";

function DetailPage() {
    const { id } = useParams(); // Obtém o ID da URL (ex: /detalhe/53)
    const navigate = useNavigate();

    // Endereços da API (ajustados para incluir o ID no final)
    const URL_QUESTIONS = `http://localhost:8000/votacao/api/question/${id}`;
    const URL_OPTIONS = `http://localhost:8000/votacao/api/options/${id}`;
    const URL_COMENTARIOS = `http://localhost:8000/votacao/api/comentarios/${id}`;

    const [question, setQuestion] = useState(null);
    const [optionList, setOptionList] = useState([]);
    const [comentarioList, setComentarioList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fazemos os 3 pedidos ao mesmo tempo para ser mais rápido
                const [resQuest, resOpt, resCom] = await Promise.all([
                    axios.get(URL_QUESTIONS),
                    axios.get(URL_OPTIONS),
                    axios.get(URL_COMENTARIOS)
                ]);

                setQuestion(resQuest.data);
                setOptionList(resOpt.data);
                setComentarioList(resCom.data);
            } catch (error) {
                console.error("Erro ao carregar dados da questão:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner color="primary" />
                <p>A carregar detalhes da questão {id}...</p>
            </Container>
        );
    }

    if (!question) {
        return (
            <Container className="mt-5">
                <p>Questão não encontrada.</p>
                <Button onClick={() => navigate("/")}>Voltar</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Detalhe da questão {id}</h2>
            </div>

            <hr />

            <DetailData
                options={optionList}
                question={question}
                comentarios={comentarioList}

                toggle={() => navigate("/")}
            />
        </Container>
    );
}

export default DetailPage;