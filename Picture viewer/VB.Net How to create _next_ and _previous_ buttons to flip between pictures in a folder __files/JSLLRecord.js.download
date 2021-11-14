window.jsllCall = function () {
    // JSLL Record
    var domainAppIdDic = {
        "social.msdn.microsoft.com": "socialmsdn",
        "social.technet.microsoft.com": "socialtechnet"
    };
    if (domainAppIdDic[document.domain]) {
        var scriptJSLL = document.createElement("script");
        scriptJSLL.type = "text/javascript";
        scriptJSLL.src = "//az725175.vo.msecnd.net/scripts/jsll-4.2.1.js";
        scriptJSLL.onload = function () {
            var appId = domainAppIdDic[document.domain];
            var config = {
                coreData: {
                    appId: appId
                }
            };
            awa.init(config);
        };
        if (document.getElementsByTagName("head") && document.getElementsByTagName("head").length > 0) {
            document.getElementsByTagName("head")[0].appendChild(scriptJSLL);
        }
    }
}

jQuery(document).ready(function () {
    try {
        window.jsllCall();
    } catch (ex) {
        console.error(ex.toString());
    }
});