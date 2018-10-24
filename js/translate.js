function translate(text, doTranslate, callback) {
    if (doTranslate == true) {
        console.log("translate");
        var googleApiKey = localStorage["googleApiKey"];
        var papagoApiKey = localStorage["papagoApiKey"];
        var papagoApiSecret = "q2i3MXKC5U";
        var sourceLanguage = "ja";
        if (papagoApiKey != undefined) {
            if (papagoApiKey.length > 0) {
                var encodedText = encodeURIComponent(text);
                var url = "https://openapi.naver.com/v1/language/translate";
                var body = "target=ko&source=" + sourceLanguage + "&text=" + encodedText
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    try {
                        if (xmlHttp.readyState == 4) {

                            if (xmlHttp.status == 200) {
                                var r = JSON.parse(xmlHttp.responseText);
                                console.log(r);
                                if (r.message.result != undefined && r.message.result > 0) {
                                    callback(r.message.result.replace("<", "&lt;").replace(">", "&gt;"));
                                }
                                else throw undefined;
                            }
                            else {
                                var r = JSON.parse(xmlHttp.responseText);
                                console.log("status : " + xmlHttp.status + "    " + r.error.message);
                                throw undefined;
                            }
                        }
                    } catch (error) {
                        callback(text);
                    }
                }
                xmlHttp.open("POST", url, true);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.setRequestHeader("X-Naver-Client-Id", papagoApiKey);
                xmlHttp.setRequestHeader("X-Naver-Client-Secret", papagoApiSecret);
                xmlHttp.send(body);
                return xmlHttp.responseText;
            }
        }
        else if (googleApiKey != undefined) {
            if (googleApiKey.length > 0) {
                var encodedText = encodeURIComponent(text);
                var url = "https://translation.googleapis.com/language/translate/v2?key=" + googleApiKey + "&q=" + encodedText + "&target=ko";
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    try {
                        if (xmlHttp.readyState == 4) {

                            if (xmlHttp.status == 200) {
                                var r = JSON.parse(xmlHttp.responseText);
                                if (r.data.translations != undefined && r.data.translations.length > 0) {
                                    callback(r.data.translations[0].translatedText.replace("<", "&lt;").replace(">", "&gt;"));
                                }
                                else throw undefined;
                            }
                            else {
                                var r = JSON.parse(xmlHttp.responseText);
                                console.log("status : " + xmlHttp.status + "    " + r.error.message);
                                throw undefined;
                            }
                        }
                    } catch (error) {
                        callback(text);
                    }
                }
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
                return xmlHttp.responseText;
            }
        }
    }
    callback(text);
}