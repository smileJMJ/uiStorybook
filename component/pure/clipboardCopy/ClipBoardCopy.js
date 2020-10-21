import BrowserDetect from "../browserDetect/BrowserDetect";

class ClipBoardCopy {
    browserObj = null; // 브라우저 정보 - 브라우저에 따라 클립보드 복사 코드가 달라짐
    option = {
        textareaHidden: false, // textarea 숨김(동적으로 생성 및 삭제) 여부, true: 숨김(동적생성) / false: 노출(마크업되어있음)
        textarea: null, // clipboard로 복사할 텍스트가 담긴 영역, input[type=text]/textarea 등 javascript 객체로
        readonly: true, // true: value값이 고정되어 복사됨 / false: textarea에 입력한 값이 복사됨
        value: null, // copy할 value 값
        btnCopy: null, // copy 버튼 객체
        callback: null // copy 되면 실행할 콜백
    };

    constructor(opt) {
        this.browserObj = new BrowserDetect();
        opt && Object.assign(this.option, opt);

        this.copy();
    }

    copy() {
        const self = this;
        let {textareaHidden, textarea, readonly, value, btnCopy, callback} = this.option;

        if(btnCopy === undefined) return;
        if(!textareaHidden && readonly) textarea.readOnly = true;
        if(!textareaHidden && value !== undefined) textarea.value = value;

        btnCopy.addEventListener('click', function(e) {
            e.preventDefault();

            if(textareaHidden) {
                textarea = self.textarea = btnCopy.parentElement.appendChild(document.createElement('textarea'));
                textarea.value = value;
            }

            self.copyFunc(textarea);
            if(textareaHidden) textarea.parentNode.removeChild(textarea);
            callback && callback();
        });
    }

    copyFunc(ta) {
        let isIEO, isIOS;

        isIEO = this.browserObj.browser.match(/IE_O/i);
        isIOS = this.browserObj.phone.match(/iPad|iPhone/i);

        if(isIOS){           // ios 일 때
            let range, selection;
            range = document.createRange();
            range.selectNodeContents(ta);
            selection = window.getSelection();
            selection.addRange(range);
            ta.setSelectionRange(0, 9999999);
            document.execCommand('copy');
        }else{
            ta.select();
            if(isIEO){
                if(window.clipboardData && window.clipboardData.setData){
                    window.clipboardData.setData('Text', ta.value);
                }
            }else{
                document.execCommand('copy');
            }
        }
    }
}

export default ClipBoardCopy;