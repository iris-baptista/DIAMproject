import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button } from "reactstrap";
import axios from "axios";
import moment from "moment";
import Header from "../components/Header.jsx";

function CreatePage() {
    const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";

    const navigate = useNavigate();
    const [novaQuestao, setNovaQuestao] = useState("");
    const [opcoes, setOpcoes] = useState([""]);

    const adicionarOpcao = () => setOpcoes([...opcoes, ""]);

    const mudarOpcao = (index, valor) => {
        const novas = [...opcoes];
        novas[index] = valor;
        setOpcoes(novas);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!novaQuestao.trim()) return;

        const pubDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss.SSSSSS");

        const res = await axios.post(URL_QUESTIONS, {
            questao_texto: novaQuestao,
            pub_data: pubDate
        });

        const novaId = res.data.id;

        for (const opcao of opcoes) {
            if (opcao.trim()) {
                await axios.post(`${URL_OPTIONS}${novaId}`, {
                    opcao_texto: opcao,
                    votos: 0,
                    questao: novaId
                });
            }
        }

        navigate("/");
    };

    return (
        <>
            <Header />
            <Container style={{ marginTop: "20px", maxWidth: "800px" }}>
                <h4>Criar Nova Questão</h4>
                <hr />
                <Form onSubmit={handleCreate}>
                    <Input
                        type="text"
                        value={novaQuestao}
                        onChange={(e) => setNovaQuestao(e.target.value)}
                        placeholder="Texto da questão..."
                        style={{ marginBottom: "8px" }}
                    />
                    {opcoes.map((opcao, index) => (
                        <Input
                            key={index}
                            type="text"
                            value={opcao}
                            onChange={(e) => mudarOpcao(index, e.target.value)}
                            placeholder={`Opção ${index + 1}...`}
                            style={{ marginBottom: "8px" }}
                        />
                    ))}
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                        <Button color="secondary" type="button" onClick={adicionarOpcao}>
                            + Nova Opção
                        </Button>
                        <Button color="primary" type="submit">Criar Questão</Button>
                        <Button color="secondary" outline onClick={() => navigate("/")}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default CreatePage;