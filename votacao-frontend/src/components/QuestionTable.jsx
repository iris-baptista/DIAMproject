import React, {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function QuestionTable() {
    const navigate = useNavigate();
    const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
    const [questionList, setQuestionList] = useState([]); // (2)
    const getQuestions = () => {
        axios.get(URL_QUESTIONS).then((request) => {
            //console.log(request.data);
            setQuestionList(request.data);
        });
    };

    const handleDelete = (id) => {
    if (!window.confirm("Apagar esta questão?")) return;
    axios.delete(`http://localhost:8000/votacao/api/question/${id}`)
        .then(() => getQuestions());
    };

    useEffect( () => { // (4)
        getQuestions();
    }, []);

    const centered = { textAlign: "center"};

    return (
        <>
        <Button color="primary" onClick={() => navigate("/criar")}>
            Criar Questão
        </Button>
        <Table light="true">
            <thead>
            <tr>
                <th>Texto</th>
                <th style={{ textAlign: "center" }}>Controls</th>
            </tr>
            </thead>
            <tbody>
            {questionList.map((question) => (
                <tr key={question.id}>
                    <td>{question.questao_texto}</td>
                    <td style={{ textAlign: "center" }}>
                        <Link to={`/detalhe/${question.id}`} className="btn btn-warning">
                            Detalhes
                        </Link>
                        {" "}
                        <Link to={`/votar/${question.id}`} className="btn btn-success">
                            Votar
                        </Link>
                        {" "}
                        <Button color="danger" onClick={() => handleDelete(question.id)}>
                            Apagar
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
    );
}

export default QuestionTable;
