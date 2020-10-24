import {ReactElement} from "react";
import ModalVM from "../viewModel/ModalViewModel";

export interface ModalProps {
    children: ReactElement;
    modalVM: ModalVM;
}

export interface IOption {
    isBgClickClose: boolean;
    isEscClose: boolean;
    isBg: boolean;
}