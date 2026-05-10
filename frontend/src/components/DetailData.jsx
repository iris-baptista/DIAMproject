import React from "react";
import { Button, Form, FormGroup, Table } from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function DetailData({options, question, comentarios, toggle}) { // (1)
    const navigate = useNavigate();

    return (
        <Form> {/* (3) */}
            <FormGroup>
                <b>Texto:</b>
                <p>{question.questao_texto} </p>
                <b>Data de publicação:</b>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p> {/* (4) */}
            </FormGroup>
            <FormGroup>
                <Table>
                    <thead>
                    <tr>
                        <th style={{textAlign: "left"}}>Opção</th>
                        <th style={{textAlign: "right"}}>Votos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {options.map( o => // (5)
                        <tr key={o.id}>
                            <td style={{textAlign: "left"}}>{o.opcao_texto}</td>
                            <td style={{textAlign: "right"}}>{o.votos}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </FormGroup>
             <FormGroup>
                <Table>
                    <thead>
                    <tr>
                        <th style={{textAlign: "left"}}>Username</th>
                        <th style={{textAlign: "left"}}>Comentários</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comentarios.map( o => // (5)
                        <tr key={o.id}>
                            <td style={{textAlign: "left"}}>{o.autor}</td>
                            <td style={{textAlign: "right"}}>{o.comentario_texto}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </FormGroup>
            <Button color="primary" onClick={() => navigate("/")}>
                Voltar à Lista
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" onClick={() => navigate(`/editar/${question.id}`)}>
                Editar Questão
            </Button>
        </Form>
    );
}

export default DetailData;