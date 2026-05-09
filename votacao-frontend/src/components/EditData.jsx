import React, { useState } from "react";
import {Button,Form,FormGroup,Table,Input,Label} from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditData({options, question}) {
    const URL_QUESTION = "http://127.0.0.1:8000/votacao/api/question/";
    const URL_OPTION = "http://127.0.0.1:8000/votacao/api/option/";
    const URL_ALLOPTIONS = "http://127.0.0.1:8000/votacao/api/options/";

    const navigate = useNavigate();

    const [texto, setTexto] = useState(question.questao_texto); //texto da questao
    const [opcoes, setOpcoes] = useState(options);
    const [novasOpcoes, setNovasOpcoes] = useState([])
    const [deletedOpcoes, setDeletedOpcoes] = useState([])

    // editar as opçoes q ja existem
    const handleOpcaoChange = (index, value) => {
        const updated = [...opcoes]; //copia as opcoes q ja temos
        updated[index].opcao_texto = value;
        setOpcoes(updated);
    };

    //adicionar mais opcoes
    const adicionarOpcao = () => setNovasOpcoes([...novasOpcoes, ""]); //copi novasOpcoes, adicionando um elemento vazio no fim

    //editar novas opcoes
    const handleNovaOpcaoChange = (index, value) => {
        const updated = [...novasOpcoes];
        updated[index]= value;
        setNovasOpcoes(updated);
    };

    //remover opcao
    const removerOpcao= (index, where) => {
        //remover da lista indicada
        if(where == "old"){
            //como ja existia adicionar a lista para remover
            setDeletedOpcoes([...deletedOpcoes, opcoes[index]]);

            const text= opcoes[index].opcao_texto;
            setOpcoes(opcoes.filter((op) => op.opcao_texto != text));
        }
        else{
            const text= novasOpcoes[index];
            setNovasOpcoes(novasOpcoes.filter((op) => op != text));
        }
    }

    // guardar tudo
    const handleSubmit = (e) => {
        e.preventDefault();

        //questao nao pode estar vazia
        //temos de ter no minimo uma opcao

        try {
            // atualizar question
            axios.put(`${URL_QUESTION}${question.id}`,
                {questao_texto: texto, pub_data:question.pub_data}
            );

            // atualizar options
            Promise.all(opcoes.map(op => {
                axios.put(`${URL_OPTION}${op.id}`,
                    {
                        questao: question.id,
                        opcao_texto: op.opcao_texto,
                        votos: op.votos
                    }
                )}
            ));

            //adicionar options novas
            for (const op of novasOpcoes) {
                if (op.trim()) {
                     axios.post(`${URL_ALLOPTIONS}${question.id}`, {
                        questao: question.id,
                        opcao_texto: op,
                        votos: 0
                    });
                }
            }

            //apagar as q foram removidas
            Promise.all(deletedOpcoes.map(op => {axios.delete(`${URL_OPTION}${op.id}`)}));

            alert("Guardado com sucesso!");
            navigate(`/detalhe/${question.id}`);

        } catch (error) {
            console.log(error.response.data);
            alert("Erro ao guardar alterações.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label><b>Texto:</b></Label>

                <Input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <br/>

                <p><b>Data de publicação:</b></p>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
            </FormGroup>

            <FormGroup>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Opção</th>
                            <th style={{ textAlign: "right" }}>Remover</th>
                        </tr>
                    </thead>

                    <tbody>
                        {opcoes.map((o, index) => (
                            <tr key={o.id}>
                                <td>
                                    <Input
                                        type="text"
                                        value={o.opcao_texto}
                                        onChange={(e) =>
                                            handleOpcaoChange(index, e.target.value)
                                        }
                                    />
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <Button color="danger" onClick={() => removerOpcao(index, "old")}>-</Button>
                                </td>
                            </tr>
                        ))}
                        {novasOpcoes.map((o, index) => (
                            <tr>
                                <td>
                                    <Input
                                        type="text"
                                        value={o}
                                        onChange={(e) =>
                                            handleNovaOpcaoChange(index, e.target.value)
                                        }
                                    />
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <Button color="danger" onClick={() => removerOpcao(index, "new")}>-</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </FormGroup>

            <Button color="primary" onClick={adicionarOpcao}>+ Nova Opção</Button><br/><br/>

            <Button color="success" type="submit">
                Guardar Alterações
            </Button>

            &nbsp;&nbsp;&nbsp;

            <Button color="secondary" onClick={() => navigate(`/detalhe/${question.id}`)}>
                Cancelar
            </Button>
        </Form>
    );
}

export default EditData;