class BrowserDetect {
    ua = null; // useragent 정보
    browser = { // browser 정보
        browser: null,
        phone: null
    };

    constructor() {
        this.ua = navigator.userAgent;
        this.browser.browser = this.checkBrowser();
        this.browser.phone = this.checkPhone();

        return this.browser;
    }

    // browser detect
    checkBrowser() {
        let sBrowser, sUsrAg = navigator.userAgent;

        if (sUsrAg.indexOf("Firefox") > -1) {
            sBrowser = "Firefox";
        } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
            sBrowser = "Opera";
        } else if (sUsrAg.indexOf("Trident") > -1 || sUsrAg.indexOf("Edge") > -1) {
            //sBrowser = "IE";
            sBrowser = this.checkIEVersion();
        } else if (sUsrAg.indexOf("Chrome") > -1) {
            sBrowser = "Chrome";
        } else if (sUsrAg.indexOf("Chrome") > -1 && sUsrAg.indexOf("Safari") > -1) {
            sBrowser = "Chrome";
        } else if (sUsrAg.indexOf("Safari") > -1 && sUsrAg.indexOf("Chrome") === -1) {
            sBrowser = "Safari";
        } else {
            sBrowser = "unknown";
        }

        return sBrowser;
    }

    // IE version check
    checkIEVersion() {
        if (location.pathname === "/browser") return; // 크롬 설치 페이지로 오면 동작 안하도록

        let bro;
        let version = "N/A";

        let agent = navigator.userAgent.toLowerCase();
        let name = navigator.appName;

        // IE old version ( IE 10 or Lower )
        if (name == "Microsoft Internet Explorer") {
            let reg = new RegExp("msie " + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
            if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;

            let numVer = Number(version);
            if(typeof(numVer) === "number" && numVer === 10) bro = `IE ${numVer}`;
            else bro = 'IE_O';
        } else {
            bro = 'IE 11';
        }

        return bro;
    }

    // phone 기종 체크
    checkPhone() {
        let phone, ua = navigator.userAgent;
        if (ua.indexOf("iPhone") > -1) {
            phone = "iPhone";
        } else if (ua.indexOf("iPad") > -1) {
            phone = "iPad";
        } else if (ua.indexOf("Android") > -1) {
            phone = "Android";
        } else { phone = ""; }

        return phone;
    }
}

export default BrowserDetect;