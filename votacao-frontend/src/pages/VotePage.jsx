import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "reactstrap";
import axios from "axios";
import VoteForm from "../components/VoteForm.jsx";

function VotePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [optionList, setOptionList] = useState([]);
    const [loading, setLoading] = useState(true);

    // URLs conforme o teu urls.py (usando question no singular para o detalhe)
    const URL_QUESTION = `http://localhost:8000/votacao/api/question/${id}`;
    const URL_OPTIONS = `http://localhost:8000/votacao/api/options/${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Carregamos a questão e as opções em paralelo
                const [resQuest, resOpt] = await Promise.all([
                    axios.get(URL_QUESTION),
                    axios.get(URL_OPTIONS)
                ]);

                setQuestion(resQuest.data);
                setOptionList(resOpt.data);
            } catch (error) {
                console.error("Erro ao carregar dados para votação:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner color="success" />
                <p>A carregar formulário de voto...</p>
            </Container>
        );
    }

    if (!question) {
        return (
            <Container className="mt-5 text-center">
                <h3>Questão não encontrada.</h3>
                <Button color="primary" onClick={() => navigate("/")}>Voltar à lista</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Votar na questão: {question.questao_texto}</h2>
                <Button color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
            </div>
            <hr />
            <VoteForm
                options={optionList}
                question={question}
                // Passamos uma função para voltar à lista após votar
                onVoteSuccess={() => navigate(`/detalhe/${id}`)}
            />
        </Container>
    );
}

export default VotePage;