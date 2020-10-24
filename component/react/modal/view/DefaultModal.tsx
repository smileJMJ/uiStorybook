import React, {useCallback, useEffect} from 'react';
import Modal from "./Modal";
import ModalViewModel from "../viewModel/ModalViewModel";

const modalVM = new ModalViewModel({
    isBgClickClose: true,
    isEscClose: true,
    isBg: true
});

const DefaultModal = (props) => {
    const {title, content} = props;

    useEffect(() => {
        modalVM.open();
    }, []);

    const closeModal = useCallback((e) => {
        modalVM.close();
    }, []);

    return (
        <>
            <Modal modalVM={modalVM}>
                <div className="modalTitle">
                    <h1>{title}</h1>
                    <button className="btnClose" onClick={closeModal}></button>
                </div>
                <div className="modalContent" dangerouslySetInnerHTML={{__html: content}}>
                </div>
            </Modal>
        </>
    );
};

export default DefaultModal;