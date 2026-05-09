{/*import React, {useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import DetailData from "./DetailData.jsx";

function DetailModal({question}) { // (1)
    const URL_COMENTARIOS = "http://localhost:8000/votacao/api/comentarios/";
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/"; // (2)
    const [showModal, setShowModal] = useState(false); // (3)
    const [optionList, setOptionList] = useState([]); // (4)
    const [comentarioList, setComentarioList] = useState([]); // (4)

    const getOptions = () => { // (5)
        axios.get(URL_OPTIONS + question.id)
            .then(request => { setOptionList(request.data);});
    };

    const getComentarios = () => { // (5)
        axios.get(URL_COMENTARIOS + question.id)
            .then(request => { setComentarioList(request.data);});
    };

    const toggleModal = () => { // (6)
        if (!showModal){
            getOptions();
            getComentarios();
        }

        setShowModal(showModal => !showModal);
    };

    return (
        <>
            <Button onClick={toggleModal} color="warning">
                Detalhe
            </Button>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Detalhe da questão {question.id}
                </ModalHeader>
                <ModalBody>
                    <DetailData options={optionList}
                                question={question}
                                comentarios={comentarioList}
                                toggle={toggleModal}/>
                </ModalBody>
            </Modal>
        </>
    );
}

export default DetailModal;*/}