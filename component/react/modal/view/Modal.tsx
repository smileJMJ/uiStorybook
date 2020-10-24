import React, {useCallback, useEffect} from 'react';
import {observer} from 'mobx-react';
import { ModalProps } from '../type';

import css from './Modal.scss';

const Modal = observer((props: ModalProps) => {
    const {modalVM} = props;

    useEffect(() => {
        if(!modalVM.isEscClose) return;
        document.addEventListener('keyup', (e) => {
            if(!modalVM.isOpen || e.keyCode !== 27) return;
            modalVM.close();
        }, false);
    }, []);

    const bgClick = useCallback((e) => {
        if(!modalVM.isBgClickClose) return;
        modalVM.close();
    }, [modalVM]);

    if(!modalVM.isOpen) return (<></>);
    return (
        <section className={css.modal}>
            {modalVM.isBg && <div className={css.modalBg} onClick={bgClick}></div>}
            <div className="modalInner">
                {props.children}
            </div>
        </section>
    );
});

export default Modal;