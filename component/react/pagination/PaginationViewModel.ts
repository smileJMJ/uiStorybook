import {action, computed, observable} from "mobx";
import {IPageUtil} from "./type";
import {EPaginationBtnType} from "../paginationButton/type";

interface IOption {
    pageUtil: IPageUtil; // 페이징 정보
}


type ClickCallbackType = Map<EPaginationBtnType, () => void>

class PaginationViewModel {
    private _startIdx = 1; // 숫자 버튼 시작 인덱스
    private _endIdx = 1;  // 숫자 버튼 끝 인덱스
    private _clickCallback: ClickCallbackType = new Map();

    @observable
    private _option: IOption = {
        pageUtil: {
            currentPage: 1,
            pageSize: 10,
            lastPage: 1,
            recordCount: 1,
            blockSize: 1
        },
    };

    constructor(option?: IOption) {
        if(option) {
            this.setOption(option);
        }
    }

    get option(): IOption {
        return this._option;
    }

    @action
    setOption(option: IOption) {
        if(!option || option.pageUtil.blockSize < 1) return;
        this._option = option;
    }

    @computed
    get curIdx(): number {
        return this._option.pageUtil.currentPage;
    }

    set curIdx(idx) {
        this._option.pageUtil.currentPage = idx;
    }

    get pageLength() {
        return this._option.pageUtil.blockSize;
    }

    @computed
    get startIdx(): number {
        const {pageUtil} = this._option;
        const {lastPage, blockSize} = pageUtil;
        let value = this.curIdx - Math.floor(this.pageLength / 2);

        if(value <= 0 || blockSize >= lastPage) value = 1;
        else if(value > lastPage - this.pageLength) value = lastPage - this.pageLength + 1;

        this._startIdx = value;
        return this._startIdx;
    }

    @computed
    get endIdx(): number {
        const {pageUtil} = this._option;
        const {lastPage} = pageUtil;
        let value = this.curIdx + Math.floor(this.pageLength / 2);
        const btnWidth = lastPage > this.pageLength ? this.pageLength : lastPage;

        if(value >= lastPage) value = lastPage;
        else if(value < btnWidth) value = btnWidth;

        this._endIdx = value;
        return this._endIdx;
    }

    // 외부에서 버튼 종류에 따른 콜백 등록
    addClickCallback(btnType: EPaginationBtnType, fn: () => void) {
        this._clickCallback.set(btnType, fn);
    }

    // 등록된 콜백 실행
    clickCallback(btnType: EPaginationBtnType) {
        if(this._clickCallback.has(EPaginationBtnType.all)) {
            this._clickCallback.get(EPaginationBtnType.all)!();
        }

        if(this._clickCallback.has(btnType)) {
            this._clickCallback.get(btnType)!();
        }
    }

    @action
    changeCurIdx(btnType: EPaginationBtnType, idx: number) {
        const {lastPage} = this._option.pageUtil;
        let value;

        if(idx < 1 || idx > lastPage) return;

        switch(btnType) {
            case 'prev':
                value = --idx;
                break;
            case 'next':
                value = ++idx;
                break;
            case 'first':
                value = idx - this.pageLength;
                value = value < 1 ? 1 : value;
                break;
            case 'last':
                value = idx + this.pageLength;
                value = value > lastPage ? lastPage : value;
                break;
            default:
                value = idx;
        }
        this.curIdx = value;
    }
}

export default PaginationViewModel;