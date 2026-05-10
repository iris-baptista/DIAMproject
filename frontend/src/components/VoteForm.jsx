import { useState } from "react";
import { Button, Form, FormGroup, Table, Label, Input } from "reactstrap";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function VoteForm({ options, question, onVoteSuccess }) {
    const navigate = useNavigate();

    const URL_OPTION = "http://localhost:8000/votacao/api/option/";
    const URL_COMMENT = "http://localhost:8000/votacao/api/comentarios/";

    const [selectedOption, setSelectedOption] = useState(-1);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");

    const voteAndRedirect = async (event) => {
        event.preventDefault();

        try {
            if (selectedOption >= 0) {
                const option = { ...options[selectedOption] };
                option.votos++;

                await axios.put(`${URL_OPTION}${option.id}`, option);
            }

            if (author && comment) {
                const newComment = {
                    autor: author,
                    comentario_texto: comment,
                    questao: question.id
                };
                await axios.post(`${URL_COMMENT}${question.id}`, newComment);
            }

            if (onVoteSuccess) {
                onVoteSuccess();
            } else {
                navigate(`/detalhe/${question.id}`);
            }

        } catch (err) {
            console.error("Erro ao submeter voto/comentário:", err);
            alert("Erro ao processar o voto.");
        }
    };

    const optionChangeHandler = (event) => {
        const index = parseInt(event.target.value);
        setSelectedOption(index);
    }

    if (!question) return <p>Pergunta não foi encontrada</p>;

    return (
        <Form onSubmit={voteAndRedirect}>
            <FormGroup>
                <b>Texto da Questão:</b>
                <p>{question.questao_texto}</p>
                <b>Data de publicação:</b>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
            </FormGroup>

            <FormGroup>
                <Table hover>
                    <thead>
                    <tr><th align="left">Escolha uma opção:</th></tr>
                    </thead>
                    <tbody>
                    {options && options.map((o, index) => (
                        <tr key={o.id}>
                            <td align="left">
                                <FormGroup check>
                                    <Label style={{ width: '100%', cursor: 'pointer' }}>
                                        <input type="radio" name="vote-radio"
                                               checked={selectedOption === index}
                                               value={index}
                                               className="form-check-input"
                                               onChange={optionChangeHandler}
                                        />
                                        {o.opcao_texto}
                                    </Label>
                                </FormGroup>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </FormGroup>

            <hr />
            <h5>Deixe um comentário (opcional):</h5>

            <FormGroup>
                <Label for="author">Nome</Label>
                <Input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="O teu nome"
                />
            </FormGroup>

            <FormGroup>
                <Label for="comment">Comentário</Label>
                <Input
                    id="comment"
                    type="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escreve o teu comentário"
                />
            </FormGroup>

            <div className="d-flex gap-2">
                <Button color="success" type="submit">Confirmar Voto</Button>
                <Button color="secondary" outline onClick={() => navigate(-1)}>Cancelar</Button>
            </div>
        </Form>
    );
}

export default VoteForm;