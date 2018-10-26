function translate(text, doTranslate, callback) {
    if (doTranslate == true) {
        var googleApiKey = localStorage["googleApiKey"];
        var papagoApiKey = localStorage["papagoApiKey"];
        var papagoApiSecret = localStorage["papagoApiSecret"];
        var sourceLanguage = "ja";
        if (papagoApiKey != undefined && papagoApiSecret != undefined) {
            if (papagoApiKey.length > 0 && papagoApiSecret.length > 0) {
                reqAjax(text, sourceLanguage, papagoApiKey, papagoApiSecret, callback)
                //reqXML(text, sourceLanguage, papagoApiKey, papagoApiSecret, callback);
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

function reqXML(text, sourceLanguage, papagoApiKey, papagoApiSecret, callback) {
    var encodedText = encodeURIComponent(text);
    var body = new FormData();
    body.append('target', 'ko');
    body.append('source', sourceLanguage);
    body.append('text', encodedText);

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
                    console.log(xmlHttp);
                    var r = JSON.parse(xmlHttp.responseText);
                    console.log("status : " + xmlHttp.status + "    " + r.error.message);
                    throw undefined;
                }
            }
        } catch (error) {
            console.log(error);
            callback(text);
        }
    }
    xmlHttp.open("GET", 'https://openapi.naver.com/v1/language/translate', true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("X-Naver-Client-Id", papagoApiKey);
    xmlHttp.setRequestHeader("X-Naver-Client-Secret", papagoApiSecret);
    xmlHttp.send(body);
    return xmlHttp.responseText;
}

function reqAjax(text, sourceLanguage, papagoApiKey, papagoApiSecret, callback) {
    var encodedText = encodeURIComponent(text);
    var targeturl = "https://openapi.naver.com/v1/language/translate";
    $.ajax({
        crossDomain: true,
        context: this,
        traditional: true,
        url: targeturl,
        type: 'POST',
        method: 'POST',
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        async: true,
        cache: true,
        timeout: 0,
        headers: {
            "X-Naver-Client-Id": papagoApiKey,
            "X-Naver-Client-Secret": papagoApiSecret,
        },
        data: {
            "target": "ko",
            "source": sourceLanguage,
            "text": encodedText
        },
        beforeSend: function (jqXHR, settings) { 
            jqXHR.setRequestHeader("x-requested-with", "*"); 
            jqXHR.setRequestHeader("Access-Control-Allow-Origin", "*"); 
        },
        success: function (responseData, textStatus, jqXHR) {
            console.log(responseData)
            console.log(textStatus)
            console.log(jqXHR)
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log(responseData);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}