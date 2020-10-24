import {action, observable} from 'mobx';
import {IOption} from "../type";

// body 스크롤 overflow: hidden/auto 시키는 코드
const bodyScrollHidden = (isHidden: boolean) => {
    const windowWidth = window.innerWidth;
    const bodyWidth = document.body.clientWidth;

    if(isHidden && (windowWidth !== bodyWidth)) {
        const scrollWidth = windowWidth - bodyWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
    } else {
        document.body.style.overflow = 'inherit';
        document.body.style.marginRight = '0px';
    }
};


class ModalViewModel {
    private _defaultOption: IOption = {
        isBgClickClose: true,
        isEscClose: true,
        isBg: true
    };
    @observable private _isOpen: boolean = false; // 모달 오픈 여부

    constructor(option?: Partial<IOption>) {
        option && Object.assign(this._defaultOption, option);
    }

    destroy() {}

    // option -----------------------------------------------------------------------//
    get isBgClickClose(): boolean { return this._defaultOption.isBgClickClose; }

    get isEscClose(): boolean { return this._defaultOption.isEscClose; }

    get isBg(): boolean { return this._defaultOption.isBg; }

    // isOpen -----------------------------------------------------------------------//
    get isOpen(): boolean { return this._isOpen; }

    @action
    open() {
        this._isOpen = true;
        this._defaultOption.isBg && bodyScrollHidden(true);
    }

    @action
    close() {
        this._isOpen = false;
        this._defaultOption.isBg && bodyScrollHidden(false);
    }

}

export default ModalViewModel;